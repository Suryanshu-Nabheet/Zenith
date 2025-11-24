import { Server } from 'socket.io';
import type { AuthenticatedSocket } from '../index';
import prisma from '../../db/client';
import logger from '../../utils/logger';
import { getUserSocketId } from '../index';

export const registerPresenceHandlers = (io: Server, socket: AuthenticatedSocket): void => {
  const userId = socket.userId!;

  // Update user status
  socket.on('user:status-update', async (data: { status: string }) => {
    try {
      await prisma.user.update({
        where: { id: userId },
        data: { status: data.status },
      });

      // Broadcast status update to all connected users
      socket.broadcast.emit('user:status-changed', {
        userId,
        status: data.status,
      });

      logger.info(`User ${userId} updated status: ${data.status}`);
    } catch (error) {
      logger.error('Error updating user status:', error);
    }
  });

  // User is typing in a conversation
  socket.on('user:typing', (data: { conversationId: string }) => {
    socket.to(data.conversationId).emit('user:typing', {
      userId,
      conversationId: data.conversationId,
    });
  });

  // User stopped typing
  socket.on('user:stop-typing', (data: { conversationId: string }) => {
    socket.to(data.conversationId).emit('user:stop-typing', {
      userId,
      conversationId: data.conversationId,
    });
  });

  // Request online status for specific users
  socket.on('user:check-online', (data: { userIds: string[] }) => {
    const onlineStatus = data.userIds.map((id) => ({
      userId: id,
      isOnline: getUserSocketId(id) !== undefined,
    }));

    socket.emit('user:online-status', onlineStatus);
  });
};
