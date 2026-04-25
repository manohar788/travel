import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Star, Calendar, DollarSign, Thermometer, ArrowLeft, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { destinations } from '@/data';
import { useAuth } from '@/context/AuthContext';

export function DestinationDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const destination = destinations.find((d) => d._id === id);

  if (!destination) {
    return (
      <main className="min-h-screen bg-background pt-24 pb-16 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold font-display text-foreground">Destination Not Found</h1>
          <Link to="/destinations">
            <Button variant="default">Browse Destinations</Button>
          </Link>
        </div>
      </main>
    );
  }

  const priceMap = { budget: '$500 - $1,000', moderate: '$1,000 - $3,000', luxury: '$3,000+' };

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative h-[50vh] md:h-[60vh]">
        <img
          src={destination.image}
          alt={`${destination.name}, ${destination.country}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
        <div className="absolute top-24 left-4 lg:left-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 glass rounded-xl px-4 py-2 text-sm font-medium text-foreground hover:bg-card/90 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
          <div className="container mx-auto">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="h-4 w-4 text-sunset-light" />
              <span className="text-sm font-medium text-primary-foreground/80">{destination.country}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-display text-primary-foreground mb-4">
              {destination.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 text-sunset fill-sunset" />
                <span className="text-lg font-bold text-primary-foreground">{destination.rating}</span>
              </div>
              <span className="text-primary-foreground/50">|</span>
              <span className="text-primary-foreground/80 capitalize">{destination.priceRange}</span>
              <span className="text-primary-foreground/50">|</span>
              <span className="text-primary-foreground/80 capitalize">{destination.climate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold font-display text-foreground mb-4">About This Destination</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">{destination.longDescription}</p>
            </div>

            <div>
              <h3 className="text-xl font-bold font-display text-foreground mb-4">Top Activities</h3>
              <div className="flex flex-wrap gap-2">
                {destination.activities.map((act) => (
                  <span
                    key={act}
                    className="px-4 py-2 rounded-xl bg-secondary text-sm font-medium text-secondary-foreground capitalize"
                  >
                    {act}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold font-display text-foreground mb-4">Mood Tags</h3>
              <div className="flex flex-wrap gap-2">
                {destination.moods.map((mood) => (
                  <span
                    key={mood}
                    className="px-4 py-2 rounded-xl gradient-ocean text-sm font-medium text-primary-foreground capitalize"
                  >
                    {mood}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft space-y-5">
              <h3 className="text-xl font-bold font-display text-foreground">Trip Details</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Price Range</p>
                    <p className="text-sm font-semibold text-foreground">{priceMap[destination.priceRange]}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Best Time to Visit</p>
                    <p className="text-sm font-semibold text-foreground">{destination.bestTimeToVisit}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                    <Thermometer className="h-5 w-5 text-coral" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Climate</p>
                    <p className="text-sm font-semibold text-foreground capitalize">{destination.climate}</p>
                  </div>
                </div>
              </div>

              <div className="pt-2 space-y-3">
                {isAuthenticated ? (
                  <Link to={`/book/${destination._id}`} className="block">
                    <Button variant="sunset" size="lg" className="w-full">
                      Book This Trip
                    </Button>
                  </Link>
                ) : (
                  <Link to="/login" className="block">
                    <Button variant="sunset" size="lg" className="w-full">
                      Sign In to Book
                    </Button>
                  </Link>
                )}

                <a
                  href={destination.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button variant="outline" size="lg" className="w-full">
                    <MapPin className="h-4 w-4 mr-2" />
                    View on Google Maps
                    <ExternalLink className="h-3 w-3 ml-2" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
