import { Request, Response, NextFunction } from 'express';
import prisma from '../db/client';
import type { AuthRequest } from '../middlewares/auth.middleware';
import { NotFoundError, ValidationError } from '../utils/errors';
import logger from '../utils/logger';

export const getConversations = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user!.id;

    const conversations = await prisma.conversation.findMany({
      where: {
        participantIds: {
          has: userId,
        },
      },
      include: {
        participants: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            isOnline: true,
            lastSeen: true,
          },
        },
        group: {
          select: {
            id: true,
            name: true,
            avatar: true,
            description: true,
          },
        },
        messages: {
          orderBy: { timestamp: 'desc' },
          take: 1,
          include: {
            sender: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    res.status(200).json({
      status: 'success',
      data: { conversations },
    });
  } catch (error) {
    next(error);
  }
};

export const getConversationById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;

    const conversation = await prisma.conversation.findUnique({
      where: { id },
      include: {
        participants: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            isOnline: true,
          },
        },
        group: true,
      },
    });

    if (!conversation) {
      throw new NotFoundError('Conversation not found');
    }

    // Check if user is participant
    if (!conversation.participantIds.includes(userId)) {
      throw new ValidationError('Access denied');
    }

    res.status(200).json({
      status: 'success',
      data: { conversation },
    });
  } catch (error) {
    next(error);
  }
};

export const createConversation = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { participantId } = req.body;
    const userId = req.user!.id;

    if (!participantId) {
      throw new ValidationError('Participant ID is required');
    }

    // Check if conversation already exists
    const existingConversation = await prisma.conversation.findFirst({
      where: {
        type: 'direct',
        AND: [
          { participantIds: { has: userId } },
          { participantIds: { has: participantId } },
        ],
      },
      include: {
        participants: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            isOnline: true,
          },
        },
      },
    });

    if (existingConversation) {
      res.status(200).json({
        status: 'success',
        data: { conversation: existingConversation },
      });
      return;
    }

    // Create new conversation
    const conversation = await prisma.conversation.create({
      data: {
        type: 'direct',
        participantIds: [userId, participantId],
      },
      include: {
        participants: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            isOnline: true,
          },
        },
      },
    });

    logger.info(`Conversation created: ${conversation.id}`);

    res.status(201).json({
      status: 'success',
      data: { conversation },
    });
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { page = '1', limit = '50' } = req.query;
    const userId = req.user!.id;

    // Check if user has access to conversation
    const conversation = await prisma.conversation.findUnique({
      where: { id },
    });

    if (!conversation) {
      throw new NotFoundError('Conversation not found');
    }

    if (!conversation.participantIds.includes(userId)) {
      throw new ValidationError('Access denied');
    }

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const skip = (pageNum - 1) * limitNum;

    const messages = await prisma.message.findMany({
      where: {
        conversationId: id,
        deletedAt: null,
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        reactions: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        timestamp: 'desc',
      },
      skip,
      take: limitNum,
    });

    const total = await prisma.message.count({
      where: {
        conversationId: id,
        deletedAt: null,
      },
    });

    res.status(200).json({
      status: 'success',
      data: {
        messages: messages.reverse(), // Reverse to get chronological order
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages: Math.ceil(total / limitNum),
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteConversation = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;

    const conversation = await prisma.conversation.findUnique({
      where: { id },
    });

    if (!conversation) {
      throw new NotFoundError('Conversation not found');
    }

    if (!conversation.participantIds.includes(userId)) {
      throw new ValidationError('Access denied');
    }

    await prisma.conversation.delete({
      where: { id },
    });

    logger.info(`Conversation deleted: ${id}`);

    res.status(200).json({
      status: 'success',
      message: 'Conversation deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
