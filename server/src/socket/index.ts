import { Server as HTTPServer } from 'http';
import { Server, Socket } from 'socket.io';
import { verifyAccessToken } from '../utils/jwt';
import logger from '../utils/logger';
import config from '../config';
import prisma from '../db/client';
import { registerMessageHandlers } from './handlers/message.handler';
import { registerCallHandlers } from './handlers/call.handler';
import { registerPresenceHandlers } from './handlers/presence.handler';

export interface AuthenticatedSocket extends Socket {
  userId?: string;
  userEmail?: string;
}

const onlineUsers = new Map<string, string>(); // userId -> socketId

export const initializeSocket = (httpServer: HTTPServer): Server => {
  const io = new Server(httpServer, {
    cors: {
      origin: config.cors.allowedOrigins,
      methods: ['GET', 'POST'],
      credentials: true,
    },
    pingTimeout: 60000,
    pingInterval: 25000,
  });

  // Authentication middleware
  io.use(async (socket: AuthenticatedSocket, next) => {
    try {
      const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.split(' ')[1];

      if (!token) {
        return next(new Error('Authentication error: No token provided'));
      }

      const payload = verifyAccessToken(token);
      socket.userId = payload.userId;
      socket.userEmail = payload.email;

      logger.info(`Socket authenticated for user: ${payload.email}`);
      next();
    } catch (error) {
      logger.error('Socket authentication failed:', error);
      next(new Error('Authentication error: Invalid token'));
    }
  });

  // Connection handler
  io.on('connection', async (socket: AuthenticatedSocket) => {
    const userId = socket.userId!;
    logger.info(`User connected: ${userId} (${socket.id})`);

    // Store online user
    onlineUsers.set(userId, socket.id);

    // Update user status to online
    await prisma.user.update({
      where: { id: userId },
      data: { isOnline: true, lastSeen: new Date() },
    });

    // Broadcast user online status to all contacts
    socket.broadcast.emit('user:online', { userId });

    // Register event handlers
    registerMessageHandlers(io, socket as AuthenticatedSocket);
    registerCallHandlers(io, socket as AuthenticatedSocket);
    registerPresenceHandlers(io, socket as AuthenticatedSocket);

    // Handle disconnection
    socket.on('disconnect', async () => {
      logger.info(`User disconnected: ${userId} (${socket.id})`);

      // Remove from online users
      onlineUsers.delete(userId);

      // Update user status to offline
      await prisma.user.update({
        where: { id: userId },
        data: { isOnline: false, lastSeen: new Date() },
      });

      // Broadcast user offline status
      socket.broadcast.emit('user:offline', { userId });
    });

    // Error handler
    socket.on('error', (error) => {
      logger.error(`Socket error for user ${userId}:`, error);
    });
  });

  logger.info('Socket.io initialized successfully');
  return io;
};

export const getOnlineUsers = (): Map<string, string> => {
  return onlineUsers;
};

export const getUserSocketId = (userId: string): string | undefined => {
  return onlineUsers.get(userId);
};
