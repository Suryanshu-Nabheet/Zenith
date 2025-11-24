import { Server } from 'socket.io';
import type { AuthenticatedSocket } from '../index';
import prisma from '../../db/client';
import logger from '../../utils/logger';
import { getUserSocketId } from '../index';

export const registerCallHandlers = (io: Server, socket: AuthenticatedSocket): void => {
  const userId = socket.userId!;

  // Initiate call
  socket.on('call:initiate', async (data: {
    receiverId: string;
    type: 'voice' | 'video';
  }) => {
    try {
      logger.info(`Call initiation from ${userId} to ${data.receiverId}`);

      // Create call record
      const call = await prisma.call.create({
        data: {
          callerId: userId,
          receiverId: data.receiverId,
          type: data.type,
          status: 'ringing',
        },
        include: {
          caller: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
      });

      // Send call notification to receiver
      const receiverSocketId = getUserSocketId(data.receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('call:incoming', call);
      } else {
        // Receiver is offline
        socket.emit('call:unavailable', { message: 'User is offline' });
        await prisma.call.update({
          where: { id: call.id },
          data: { status: 'missed' },
        });
        return;
      }

      // Acknowledge to caller
      socket.emit('call:initiated', call);
    } catch (error) {
      logger.error('Error initiating call:', error);
      socket.emit('error', { message: 'Failed to initiate call' });
    }
  });

  // Accept call
  socket.on('call:accept', async (data: { callId: string }) => {
    try {
      const call = await prisma.call.update({
        where: { id: data.callId },
        data: { status: 'active' },
        include: {
          caller: { select: { id: true } },
          receiver: { select: { id: true } },
        },
      });

      // Notify caller
      const callerSocketId = getUserSocketId(call.callerId);
      if (callerSocketId) {
        io.to(callerSocketId).emit('call:accepted', { callId: data.callId });
      }

      logger.info(`Call accepted: ${data.callId}`);
    } catch (error) {
      logger.error('Error accepting call:', error);
      socket.emit('error', { message: 'Failed to accept call' });
    }
  });

  // Reject call
  socket.on('call:reject', async (data: { callId: string }) => {
    try {
      const call = await prisma.call.update({
        where: { id: data.callId },
        data: { status: 'rejected', endTime: new Date() },
      });

      // Notify caller
      const callerSocketId = getUserSocketId(call.callerId);
      if (callerSocketId) {
        io.to(callerSocketId).emit('call:rejected', { callId: data.callId });
      }

      logger.info(`Call rejected: ${data.callId}`);
    } catch (error) {
      logger.error('Error rejecting call:', error);
    }
  });

  // End call
  socket.on('call:end', async (data: { callId: string }) => {
    try {
      const call = await prisma.call.findUnique({
        where: { id: data.callId },
      });

      if (!call) {
        socket.emit('error', { message: 'Call not found' });
        return;
      }

      const duration = Math.floor(
        (new Date().getTime() - call.startTime.getTime()) / 1000
      );

      const updatedCall = await prisma.call.update({
        where: { id: data.callId },
        data: {
          status: 'ended',
          endTime: new Date(),
          duration,
        },
      });

      // Notify both participants
      const callerSocketId = getUserSocketId(call.callerId);
      const receiverSocketId = getUserSocketId(call.receiverId);

      if (callerSocketId) {
        io.to(callerSocketId).emit('call:ended', { callId: data.callId, duration });
      }
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('call:ended', { callId: data.callId, duration });
      }

      logger.info(`Call ended: ${data.callId}, duration: ${duration}s`);
    } catch (error) {
      logger.error('Error ending call:', error);
      socket.emit('error', { message: 'Failed to end call' });
    }
  });

  // WebRTC signaling - ICE candidate
  socket.on('call:ice-candidate', (data: {
    receiverId: string;
    candidate: RTCIceCandidateInit;
  }) => {
    const receiverSocketId = getUserSocketId(data.receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('call:ice-candidate', {
        senderId: userId,
        candidate: data.candidate,
      });
    }
  });

  // WebRTC signaling - Offer
  socket.on('call:offer', (data: {
    receiverId: string;
    offer: RTCSessionDescriptionInit;
  }) => {
    const receiverSocketId = getUserSocketId(data.receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('call:offer', {
        senderId: userId,
        offer: data.offer,
      });
    }
  });

  // WebRTC signaling - Answer
  socket.on('call:answer', (data: {
    callerId: string;
    answer: RTCSessionDescriptionInit;
  }) => {
    const callerSocketId = getUserSocketId(data.callerId);
    if (callerSocketId) {
      io.to(callerSocketId).emit('call:answer', {
        senderId: userId,
        answer: data.answer,
      });
    }
  });
};
