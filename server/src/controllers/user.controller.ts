import { Request, Response, NextFunction } from 'express';
import prisma from '../db/client';
import type { AuthRequest } from '../middlewares/auth.middleware';
import { NotFoundError, ValidationError } from '../utils/errors';
import logger from '../utils/logger';

export const getUsers = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { search } = req.query;
    const currentUserId = req.user!.id;

    const users = await prisma.user.findMany({
      where: {
        AND: [
          { id: { not: currentUserId } },
          search
            ? {
                OR: [
                  { name: { contains: search as string, mode: 'insensitive' } },
                  { email: { contains: search as string, mode: 'insensitive' } },
                ],
              }
            : {},
        ],
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        status: true,
        isOnline: true,
        lastSeen: true,
      },
      take: 50,
    });

    res.status(200).json({
      status: 'success',
      data: { users },
    });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        status: true,
        isOnline: true,
        lastSeen: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    res.status(200).json({
      status: 'success',
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, avatar, status } = req.body;
    const userId = req.user!.id;

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(name && { name }),
        ...(avatar && { avatar }),
        ...(status && { status }),
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        status: true,
      },
    });

    logger.info(`User profile updated: ${userId}`);

    res.status(200).json({
      status: 'success',
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};
