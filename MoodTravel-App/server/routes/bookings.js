import { Router } from 'express';
import Booking from '../models/Booking.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = Router();

// Get user's bookings
router.get('/my', authenticate, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id })
      .populate('destinationId')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all bookings (admin)
router.get('/', authenticate, requireAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('destinationId')
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create booking
router.post('/', authenticate, async (req, res) => {
  try {
    const { destinationId, travelDate, returnDate, travelers, totalPrice } = req.body;
    if (!destinationId || !travelDate || !returnDate || !travelers) {
      return res.status(400).json({ message: 'All booking fields are required' });
    }
    if (new Date(returnDate) <= new Date(travelDate)) {
      return res.status(400).json({ message: 'Return date must be after travel date' });
    }
    const booking = await Booking.create({
      userId: req.user._id,
      destinationId,
      travelDate,
      returnDate,
      travelers,
      totalPrice,
    });
    const populated = await booking.populate('destinationId');
    res.status(201).json(populated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Cancel booking
router.put('/:id/cancel', authenticate, async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, userId: req.user._id });
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    booking.status = 'cancelled';
    await booking.save();
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
