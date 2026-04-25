import { Router } from 'express';
import Destination from '../models/Destination.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = Router();

// Get all destinations
router.get('/', async (req, res) => {
  try {
    const { mood, climate, priceRange, featured, search } = req.query;
    const filter = {};
    if (mood) filter.moods = mood;
    if (climate) filter.climate = climate;
    if (priceRange) filter.priceRange = priceRange;
    if (featured === 'true') filter.featured = true;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { country: { $regex: search, $options: 'i' } },
      ];
    }
    const destinations = await Destination.find(filter).sort({ rating: -1 });
    res.json(destinations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single destination
router.get('/:id', async (req, res) => {
  try {
    const dest = await Destination.findById(req.params.id);
    if (!dest) return res.status(404).json({ message: 'Destination not found' });
    res.json(dest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get recommendations based on mood
router.post('/recommend', async (req, res) => {
  try {
    const { mood, budget, climate, activity } = req.body;
    const all = await Destination.find();

    const scored = all.map((dest) => {
      let score = 0;
      if (dest.moods.includes(mood)) score += 40;
      if (dest.priceRange === budget) score += 25;
      if (dest.climate === climate) score += 20;
      if (dest.activities.some((a) => a.toLowerCase().includes((activity || '').toLowerCase()))) score += 15;
      if (dest.featured) score += 5;
      score += dest.rating * 2;
      return { destination: dest, score };
    });

    scored.sort((a, b) => b.score - a.score);
    res.json(scored.slice(0, 5).map((s) => s.destination));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create destination (admin)
router.post('/', authenticate, requireAdmin, async (req, res) => {
  try {
    const dest = await Destination.create(req.body);
    res.status(201).json(dest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update destination (admin)
router.put('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const dest = await Destination.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!dest) return res.status(404).json({ message: 'Destination not found' });
    res.json(dest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete destination (admin)
router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    await Destination.findByIdAndDelete(req.params.id);
    res.json({ message: 'Destination deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
