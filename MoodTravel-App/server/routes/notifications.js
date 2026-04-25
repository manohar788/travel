import { Router } from 'express';
import Notification from '../models/Notification.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = Router();

// Get active notifications (public)
router.get('/', async (req, res) => {
  try {
    const notifications = await Notification.find({ active: true }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create notification (admin)
router.post('/', authenticate, requireAdmin, async (req, res) => {
  try {
    const { message, type } = req.body;
    if (!message) return res.status(400).json({ message: 'Message is required' });
    const notif = await Notification.create({ message, type: type || 'info' });
    res.status(201).json(notif);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete notification (admin)
router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.json({ message: 'Notification deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
