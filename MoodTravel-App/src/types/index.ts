export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export interface Destination {
  _id: string;
  name: string;
  country: string;
  description: string;
  longDescription: string;
  image: string;
  rating: number;
  priceRange: 'budget' | 'moderate' | 'luxury';
  climate: 'tropical' | 'temperate' | 'cold' | 'arid';
  moods: string[];
  activities: string[];
  bestTimeToVisit: string;
  googleMapsUrl: string;
  coordinates: { lat: number; lng: number };
  featured: boolean;
}

export interface Booking {
  _id: string;
  userId: string;
  destinationId: string;
  destination?: Destination;
  travelDate: string;
  returnDate: string;
  travelers: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface MoodAnswer {
  mood: string;
  travelStyle: string;
  budget: string;
  climate: string;
  activity: string;
}

export interface Notification {
  _id: string;
  message: string;
  type: 'info' | 'promo' | 'alert';
  active: boolean;
}
