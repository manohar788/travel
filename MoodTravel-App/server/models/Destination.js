import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  country: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  longDescription: { type: String, required: true },
  image: { type: String, required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
  priceRange: { type: String, enum: ['budget', 'moderate', 'luxury'], required: true },
  climate: { type: String, enum: ['tropical', 'temperate', 'cold', 'arid'], required: true },
  moods: [{ type: String }],
  activities: [{ type: String }],
  bestTimeToVisit: { type: String },
  googleMapsUrl: { type: String },
  coordinates: {
    lat: Number,
    lng: Number,
  },
  featured: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('Destination', destinationSchema);
