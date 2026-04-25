import { Link } from 'react-router-dom';
import { Compass, Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl gradient-sunset flex items-center justify-center">
                <Compass className="h-5 w-5 text-accent-foreground" />
              </div>
              <span className="text-xl font-bold font-display">MoodTravel</span>
            </div>
            <p className="text-sm opacity-70 leading-relaxed">
              Discover your perfect travel destination based on how you feel. Let your mood guide your next adventure.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold">Explore</h4>
            <div className="flex flex-col gap-2">
              <Link to="/questionnaire" className="text-sm opacity-70 hover:opacity-100 transition-opacity">
                Take Mood Quiz
              </Link>
              <Link to="/destinations" className="text-sm opacity-70 hover:opacity-100 transition-opacity">
                All Destinations
              </Link>
              <Link to="/my-bookings" className="text-sm opacity-70 hover:opacity-100 transition-opacity">
                My Bookings
              </Link>
            </div>
          </div>

          {/* Moods */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold">Travel Moods</h4>
            <div className="flex flex-col gap-2">
              {['Adventurous', 'Relaxed', 'Romantic', 'Cultural', 'Energetic', 'Peaceful'].map((mood) => (
                <span key={mood} className="text-sm opacity-70">{mood}</span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold">Contact Us</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm opacity-70">
                <Mail className="h-4 w-4 shrink-0" />
                <span>hello@moodtravel.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm opacity-70">
                <Phone className="h-4 w-4 shrink-0" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-sm opacity-70">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm opacity-50">
            &copy; 2026 MoodTravel. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-sm opacity-50 hover:opacity-70 cursor-pointer transition-opacity">Privacy Policy</span>
            <span className="text-sm opacity-50 hover:opacity-70 cursor-pointer transition-opacity">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
