const express = require('express');
const router = express.Router();
const { getUsers, promoteToAdmin } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

// All routes require admin
router.use(protect, authorize('admin'));

router.get('/', getUsers);
router.put('/:id/promote', promoteToAdmin);

module.exports = router;