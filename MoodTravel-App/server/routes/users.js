import User from '../models/User.js';
import { Router } from 'express';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = Router();

// Get all users (admin)
router.get('/', authenticate, requireAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
