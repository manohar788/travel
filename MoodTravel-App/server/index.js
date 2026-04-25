import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './config.js';
import authRoutes from './routes/auth.js';
import destinationRoutes from './routes/destinations.js';
import bookingRoutes from './routes/bookings.js';
import notificationRoutes from './routes/notifications.js';
import userRoutes from './routes/users.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/users', userRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Connect to MongoDB and start server
async function start() {
  try {
    await mongoose.connect(config.mongoUri);
    console.log('Connected to MongoDB');
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err.message);
    console.log('Starting server without MongoDB connection...');
    console.log('The frontend works independently with localStorage.');
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port} (without DB)`);
    });
  }
}

start();
