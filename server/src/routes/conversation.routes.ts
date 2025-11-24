import { Router } from 'express';
import {
  getConversations,
  getConversationById,
  createConversation,
  getMessages,
  deleteConversation,
} from '../controllers/conversation.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

// All conversation routes require authentication
router.use(authenticate);

/**
 * @route   GET /api/conversations
 * @desc    Get user's conversations
 * @access  Private
 */
router.get('/', getConversations);

/**
 * @route   GET /api/conversations/:id
 * @desc    Get conversation by ID
 * @access  Private
 */
router.get('/:id', getConversationById);

/**
 * @route   POST /api/conversations
 * @desc    Create new conversation
 * @access  Private
 */
router.post('/', createConversation);

/**
 * @route   GET /api/conversations/:id/messages
 * @desc    Get conversation messages (paginated)
 * @access  Private
 */
router.get('/:id/messages', getMessages);

/**
 * @route   DELETE /api/conversations/:id
 * @desc    Delete conversation
 * @access  Private
 */
router.delete('/:id', deleteConversation);

export default router;
