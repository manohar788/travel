import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Calendar, Users, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { destinations } from '@/data';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/toast';
import type { Booking } from '@/types';

export function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user, addBooking } = useAuth();

  const destination = destinations.find((d) => d._id === id);

  const [travelDate, setTravelDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [travelers, setTravelers] = useState(1);
  const [loading, setLoading] = useState(false);

  if (!destination) {
    return (
      <main className="min-h-screen bg-background pt-24 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold font-display text-foreground">Destination Not Found</h1>
          <Link to="/destinations"><Button>Browse Destinations</Button></Link>
        </div>
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-background pt-24 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold font-display text-foreground">Please Sign In</h1>
          <p className="text-muted-foreground">You need to be logged in to book a trip.</p>
          <Link to="/login"><Button>Sign In</Button></Link>
        </div>
      </main>
    );
  }

  const basePrices = { budget: 800, moderate: 2000, luxury: 5000 };
  const basePrice = basePrices[destination.priceRange];
  const totalPrice = basePrice * travelers;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!travelDate || !returnDate) {
      toast('Please select travel and return dates', 'error');
      return;
    }
    if (new Date(returnDate) <= new Date(travelDate)) {
      toast('Return date must be after travel date', 'error');
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));

    const booking: Booking = {
      _id: Math.random().toString(36).slice(2),
      userId: user!._id,
      destinationId: destination._id,
      destination,
      travelDate,
      returnDate,
      travelers,
      totalPrice,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };
    addBooking(booking);
    setLoading(false);
    toast('Booking confirmed! Happy travels!', 'success');
    navigate('/my-bookings');
  };

  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to destination
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Destination Summary */}
          <div className="space-y-6">
            <div className="rounded-2xl overflow-hidden shadow-medium">
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full aspect-video object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold font-display text-foreground">{destination.name}</h2>
              <p className="text-muted-foreground mt-1">{destination.country}</p>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{destination.description}</p>
            </div>
          </div>

          {/* Booking Form */}
          <div className="rounded-2xl border border-border bg-card p-8 shadow-soft">
            <h2 className="text-2xl font-bold font-display text-foreground mb-6">Book Your Trip</h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  Travel Date
                </label>
                <Input
                  type="date"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-accent" />
                  Return Date
                </label>
                <Input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  min={travelDate || new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Users className="h-4 w-4 text-forest" />
                  Number of Travelers
                </label>
                <Input
                  type="number"
                  value={travelers}
                  onChange={(e) => setTravelers(Math.max(1, parseInt(e.target.value) || 1))}
                  min={1}
                  max={10}
                />
              </div>

              {/* Price Summary */}
              <div className="rounded-xl bg-secondary/60 p-5 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Base price per person</span>
                  <span className="font-medium text-foreground">${basePrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Travelers</span>
                  <span className="font-medium text-foreground">x{travelers}</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="text-xl font-bold text-gradient-sunset">${totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <Button type="submit" variant="sunset" size="lg" className="w-full" disabled={loading}>
                {loading ? 'Confirming...' : 'Confirm Booking'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
