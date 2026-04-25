import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/toast';
import { cn } from '@/lib/utils';

export function MyBookingsPage() {
  const { isAuthenticated, bookings, cancelBooking } = useAuth();

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-background pt-24 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold font-display text-foreground">Please Sign In</h1>
          <p className="text-muted-foreground">Sign in to view your bookings.</p>
          <Link to="/login"><Button>Sign In</Button></Link>
        </div>
      </main>
    );
  }

  const handleCancel = (id: string) => {
    cancelBooking(id);
    toast('Booking cancelled', 'info');
  };

  const statusColors = {
    pending: 'bg-sunset/10 text-sunset-dark',
    confirmed: 'bg-forest/10 text-forest',
    cancelled: 'bg-destructive/10 text-destructive',
  };

  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <h1 className="text-4xl font-bold font-display text-foreground mb-2">My Bookings</h1>
        <p className="text-muted-foreground mb-10">Manage your upcoming and past travel bookings.</p>

        {bookings.length === 0 ? (
          <div className="text-center py-20 space-y-4">
            <p className="text-xl text-muted-foreground">No bookings yet.</p>
            <Link to="/destinations">
              <Button variant="sunset">Explore Destinations</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="flex flex-col md:flex-row gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft hover:shadow-medium transition-shadow"
              >
                {booking.destination && (
                  <img
                    src={booking.destination.image}
                    alt={booking.destination.name}
                    className="w-full md:w-40 h-32 object-cover rounded-xl"
                  />
                )}
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold font-display text-foreground">
                        {booking.destination?.name || 'Unknown Destination'}
                      </h3>
                      {booking.destination && (
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5" />
                          <span className="text-sm">{booking.destination.country}</span>
                        </div>
                      )}
                    </div>
                    <span className={cn(
                      "px-3 py-1 rounded-lg text-xs font-semibold capitalize",
                      statusColors[booking.status]
                    )}>
                      {booking.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(booking.travelDate).toLocaleDateString()} — {new Date(booking.returnDate).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      {booking.travelers} traveler{booking.travelers > 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-lg font-bold text-foreground">${booking.totalPrice.toLocaleString()}</span>
                    {booking.status === 'confirmed' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleCancel(booking._id)}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
