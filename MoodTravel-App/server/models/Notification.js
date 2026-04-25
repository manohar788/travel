import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  message: { type: String, required: true },
  type: { type: String, enum: ['info', 'promo', 'alert'], default: 'info' },
  active: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model('Notification', notificationSchema);
