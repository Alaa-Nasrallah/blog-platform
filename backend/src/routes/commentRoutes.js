const express = require('express');
const router = express.Router({ mergeParams: true });
const {
  getComments,
  createComment,
  deleteComment,
  getAllComments
} = require('../controllers/commentController');
const { protect, authorize } = require('../middleware/auth');

// ===========================================
// PUBLIC ROUTES
// ===========================================

// @route   GET /api/posts/:postId/comments
// @desc    Get all comments for a post
// @access  Public
router.get('/', getComments);

// ===========================================
// PROTECTED ROUTES (require login)
// ===========================================

// @route   POST /api/posts/:postId/comments
// @desc    Create a new comment
// @access  Private (User only)
// Only users can comment, NOT admins
router.post('/', protect, authorize('user'), createComment);

// ===========================================
// ADMIN ONLY ROUTES
// ===========================================

// @route   DELETE /api/comments/:id
// @desc    Soft delete a comment
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin'), deleteComment);

// @route   GET /api/comments/admin/all
// @desc    Get all comments (including deleted)
// @access  Private/Admin
router.get('/admin/all', protect, authorize('admin'), getAllComments);

console.log('✅ Comment routes loaded');
module.exports = router;