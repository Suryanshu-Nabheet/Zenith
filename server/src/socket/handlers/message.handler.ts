import { Server } from 'socket.io';
import type { AuthenticatedSocket } from '../index';
import prisma from '../../db/client';
import logger from '../../utils/logger';
import { getUserSocketId } from '../index';

export const registerMessageHandlers = (io: Server, socket: AuthenticatedSocket): void => {
  const userId = socket.userId!;

  // Send message
  socket.on('message:send', async (data: {
    conversationId: string;
    content: string;
    type?: string;
  }) => {
    try {
      logger.info(`Message send request from ${userId}:`, data);

      // Create message in database
      const message = await prisma.message.create({
        data: {
          content: data.content,
          senderId: userId,
          conversationId: data.conversationId,
          type: data.type || 'text',
          status: 'sent',
          encrypted: true,
        },
        include: {
          sender: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
      });

      // Get conversation participants
      const conversation = await prisma.conversation.findUnique({
        where: { id: data.conversationId },
        include: {
          participants: {
            select: { id: true },
          },
        },
      });

      if (!conversation) {
        socket.emit('error', { message: 'Conversation not found' });
        return;
      }

      // Send to all participants in the conversation
      conversation.participants.forEach((participant) => {
        const participantSocketId = getUserSocketId(participant.id);
        if (participantSocketId) {
          io.to(participantSocketId).emit('message:new', message);
        }
      });

      // Acknowledge to sender
      socket.emit('message:sent', message);

      logger.info(`Message sent successfully: ${message.id}`);
    } catch (error) {
      logger.error('Error sending message:', error);
      socket.emit('error', { message: 'Failed to send message' });
    }
  });

  // Mark message as delivered
  socket.on('message:delivered', async (data: { messageId: string }) => {
    try {
      const message = await prisma.message.update({
        where: { id: data.messageId },
        data: { status: 'delivered' },
      });

      // Notify sender
      const senderSocketId = getUserSocketId(message.senderId);
      if (senderSocketId) {
        io.to(senderSocketId).emit('message:delivered', {
          messageId: data.messageId,
          status: 'delivered',
        });
      }
    } catch (error) {
      logger.error('Error marking message as delivered:', error);
    }
  });

  // Mark message as read
  socket.on('message:read', async (data: { messageId: string }) => {
    try {
      const message = await prisma.message.update({
        where: { id: data.messageId },
        data: { status: 'read' },
      });

      // Create read receipt
      await prisma.readReceipt.create({
        data: {
          messageId: data.messageId,
          userId: userId,
        },
      });

      // Notify sender
      const senderSocketId = getUserSocketId(message.senderId);
      if (senderSocketId) {
        io.to(senderSocketId).emit('message:read', {
          messageId: data.messageId,
          status: 'read',
          readBy: userId,
        });
      }
    } catch (error) {
      logger.error('Error marking message as read:', error);
    }
  });

  // Typing indicator
  socket.on('message:typing', (data: { conversationId: string }) => {
    socket.to(data.conversationId).emit('message:typing', {
      userId,
      conversationId: data.conversationId,
    });
  });

  // Stop typing indicator
  socket.on('message:stop-typing', (data: { conversationId: string }) => {
    socket.to(data.conversationId).emit('message:stop-typing', {
      userId,
      conversationId: data.conversationId,
    });
  });

  // Delete message
  socket.on('message:delete', async (data: { messageId: string }) => {
    try {
      const message = await prisma.message.findUnique({
        where: { id: data.messageId },
      });

      if (!message) {
        socket.emit('error', { message: 'Message not found' });
        return;
      }

      // Only sender can delete
      if (message.senderId !== userId) {
        socket.emit('error', { message: 'Unauthorized' });
        return;
      }

      // Soft delete
      await prisma.message.update({
        where: { id: data.messageId },
        data: { deletedAt: new Date() },
      });

      // Notify all participants
      const conversation = await prisma.conversation.findUnique({
        where: { id: message.conversationId },
        include: {
          participants: { select: { id: true } },
        },
      });

      conversation?.participants.forEach((participant) => {
        const participantSocketId = getUserSocketId(participant.id);
        if (participantSocketId) {
          io.to(participantSocketId).emit('message:deleted', {
            messageId: data.messageId,
          });
        }
      });

      logger.info(`Message deleted: ${data.messageId}`);
    } catch (error) {
      logger.error('Error deleting message:', error);
      socket.emit('error', { message: 'Failed to delete message' });
    }
  });

  // Edit message
  socket.on('message:edit', async (data: { messageId: string; newContent: string }) => {
    try {
      const message = await prisma.message.findUnique({
        where: { id: data.messageId },
      });

      if (!message) {
        socket.emit('error', { message: 'Message not found' });
        return;
      }

      if (message.senderId !== userId) {
        socket.emit('error', { message: 'Unauthorized' });
        return;
      }

      const updatedMessage = await prisma.message.update({
        where: { id: data.messageId },
        data: {
          content: data.newContent,
          editedAt: new Date(),
        },
      });

      // Notify all participants
      const conversation = await prisma.conversation.findUnique({
        where: { id: message.conversationId },
        include: {
          participants: { select: { id: true } },
        },
      });

      conversation?.participants.forEach((participant) => {
        const participantSocketId = getUserSocketId(participant.id);
        if (participantSocketId) {
          io.to(participantSocketId).emit('message:edited', updatedMessage);
        }
      });

      logger.info(`Message edited: ${data.messageId}`);
    } catch (error) {
      logger.error('Error editing message:', error);
      socket.emit('error', { message: 'Failed to edit message' });
    }
  });
};
