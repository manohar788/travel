import mongoose from 'mongoose';
import config from '../config.js';
import User from '../models/User.js';
import Destination from '../models/Destination.js';
import Notification from '../models/Notification.js';

const destinations = [
  {
    name: 'Santorini',
    country: 'Greece',
    description: 'Iconic white-washed villages perched on volcanic cliffs with breathtaking sunset views over the Aegean Sea.',
    longDescription: 'Santorini is a stunning Greek island known for its dramatic views, gorgeous sunsets from Oia, blue-domed churches, and vibrant nightlife. The island offers pristine beaches with unique red and black volcanic sand, world-class wineries, and ancient ruins at Akrotiri.',
    image: '/images/dest-santorini.png',
    rating: 4.9,
    priceRange: 'luxury',
    climate: 'temperate',
    moods: ['romantic', 'relaxed', 'cultural'],
    activities: ['sightseeing', 'wine tasting', 'beach', 'photography', 'dining'],
    bestTimeToVisit: 'April to October',
    googleMapsUrl: 'https://maps.google.com/?q=Santorini,Greece',
    coordinates: { lat: 36.3932, lng: 25.4615 },
    featured: true,
  },
  {
    name: 'Bali',
    country: 'Indonesia',
    description: 'A tropical paradise of terraced rice paddies, ancient temples, and world-class surf beaches.',
    longDescription: 'Bali enchants visitors with its lush landscapes, vibrant culture, and spiritual energy. From the terraced rice fields of Ubud to the surf breaks of Uluwatu, the island offers incredible diversity.',
    image: '/images/dest-bali.png',
    rating: 4.8,
    priceRange: 'moderate',
    climate: 'tropical',
    moods: ['adventurous', 'peaceful', 'cultural', 'relaxed'],
    activities: ['surfing', 'temples', 'hiking', 'spa', 'yoga', 'diving'],
    bestTimeToVisit: 'April to October',
    googleMapsUrl: 'https://maps.google.com/?q=Bali,Indonesia',
    coordinates: { lat: -8.3405, lng: 115.092 },
    featured: true,
  },
  {
    name: 'Swiss Alps',
    country: 'Switzerland',
    description: 'Majestic mountain peaks, crystal-clear lakes, and charming alpine villages in the heart of Europe.',
    longDescription: 'The Swiss Alps are a breathtaking wonderland of snow-capped peaks, emerald valleys, and pristine alpine lakes.',
    image: '/images/dest-switzerland.png',
    rating: 4.9,
    priceRange: 'luxury',
    climate: 'cold',
    moods: ['adventurous', 'peaceful', 'energetic'],
    activities: ['skiing', 'hiking', 'mountaineering', 'scenic trains', 'photography'],
    bestTimeToVisit: 'June to September or December to March',
    googleMapsUrl: 'https://maps.google.com/?q=Swiss+Alps,Switzerland',
    coordinates: { lat: 46.8182, lng: 8.2275 },
    featured: true,
  },
  {
    name: 'Tokyo',
    country: 'Japan',
    description: 'A mesmerizing blend of ultramodern technology and ancient traditions.',
    longDescription: 'Tokyo is a city of incredible contrasts where neon-lit skyscrapers tower over serene ancient temples.',
    image: '/images/dest-tokyo.png',
    rating: 4.8,
    priceRange: 'moderate',
    climate: 'temperate',
    moods: ['energetic', 'cultural', 'adventurous'],
    activities: ['dining', 'shopping', 'temples', 'technology', 'nightlife', 'anime'],
    bestTimeToVisit: 'March to May or September to November',
    googleMapsUrl: 'https://maps.google.com/?q=Tokyo,Japan',
    coordinates: { lat: 35.6762, lng: 139.6503 },
    featured: false,
  },
  {
    name: 'Paris',
    country: 'France',
    description: 'The City of Light enchants with timeless architecture, world-class art, and unmatched culinary excellence.',
    longDescription: 'Paris captivates the heart like no other city. Stroll along the Seine at golden hour, marvel at the Eiffel Tower sparkling at night.',
    image: '/images/dest-paris.png',
    rating: 4.7,
    priceRange: 'luxury',
    climate: 'temperate',
    moods: ['romantic', 'cultural', 'relaxed'],
    activities: ['museums', 'dining', 'sightseeing', 'shopping', 'photography', 'wine tasting'],
    bestTimeToVisit: 'April to June or September to October',
    googleMapsUrl: 'https://maps.google.com/?q=Paris,France',
    coordinates: { lat: 48.8566, lng: 2.3522 },
    featured: true,
  },
  {
    name: 'Maldives',
    country: 'Maldives',
    description: 'Paradise on Earth — pristine overwater villas floating above turquoise lagoons.',
    longDescription: 'The Maldives is the ultimate tropical escape — a chain of 1,190 coral islands scattered across the Indian Ocean.',
    image: '/images/dest-maldives.png',
    rating: 4.9,
    priceRange: 'luxury',
    climate: 'tropical',
    moods: ['romantic', 'relaxed', 'peaceful'],
    activities: ['diving', 'snorkeling', 'beach', 'spa', 'water sports'],
    bestTimeToVisit: 'November to April',
    googleMapsUrl: 'https://maps.google.com/?q=Maldives',
    coordinates: { lat: 3.2028, lng: 73.2207 },
    featured: true,
  },
  {
    name: 'Queenstown',
    country: 'New Zealand',
    description: 'The adventure capital of the world — dramatic fjords, bungee jumping, and cinematic landscapes.',
    longDescription: 'Queenstown sits on the shores of crystal-clear Lake Wakatipu surrounded by the dramatic Southern Alps.',
    image: '/images/dest-newzealand.png',
    rating: 4.8,
    priceRange: 'moderate',
    climate: 'cold',
    moods: ['adventurous', 'energetic', 'peaceful'],
    activities: ['bungee jumping', 'hiking', 'skiing', 'skydiving', 'kayaking', 'scenic flights'],
    bestTimeToVisit: 'December to February or June to August',
    googleMapsUrl: 'https://maps.google.com/?q=Queenstown,New+Zealand',
    coordinates: { lat: -45.0312, lng: 168.6626 },
    featured: false,
  },
  {
    name: 'Marrakech',
    country: 'Morocco',
    description: 'A sensory feast of vibrant souks, exotic spices, intricate mosaics, and warm hospitality.',
    longDescription: 'Marrakech is a city that awakens all the senses. Navigate the labyrinthine souks filled with handcrafted lanterns.',
    image: '/images/dest-morocco.png',
    rating: 4.6,
    priceRange: 'budget',
    climate: 'arid',
    moods: ['adventurous', 'cultural', 'energetic'],
    activities: ['souks', 'desert tours', 'cooking classes', 'architecture', 'camel riding'],
    bestTimeToVisit: 'March to May or September to November',
    googleMapsUrl: 'https://maps.google.com/?q=Marrakech,Morocco',
    coordinates: { lat: 31.6295, lng: -7.9811 },
    featured: false,
  },
];

const notifs = [
  { message: 'Flash Sale: 30% off Bali packages this weekend only!', type: 'promo', active: true },
  { message: 'New destination added: Explore the magic of Kyoto, Japan', type: 'info', active: true },
  { message: 'Summer travel alert: Book Santorini before June for best rates', type: 'promo', active: true },
  { message: 'MoodTravel tip: Take our mood quiz to find your perfect escape', type: 'info', active: true },
  { message: 'Limited availability: Maldives overwater villas selling fast', type: 'alert', active: true },
];

async function seed() {
  try {
    await mongoose.connect(config.mongoUri);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Destination.deleteMany({}),
      Notification.deleteMany({}),
    ]);

    // Create admin user
    await User.create({
      name: 'Admin',
      email: 'admin@moodtravel.com',
      password: 'admin123',
      role: 'admin',
    });
    console.log('Admin user created: admin@moodtravel.com / admin123');

    // Create destinations
    await Destination.insertMany(destinations);
    console.log(`${destinations.length} destinations created`);

    // Create notifications
    await Notification.insertMany(notifs);
    console.log(`${notifs.length} notifications created`);

    console.log('Seed completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err);
    process.exit(1);
  }
}

seed();
