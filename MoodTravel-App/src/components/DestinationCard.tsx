import { Link } from 'react-router-dom';
import { MapPin, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Destination } from '@/types';

interface DestinationCardProps {
  destination: Destination;
}

export function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <Card className="group overflow-hidden hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 border-transparent">
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={destination.image}
          alt={`${destination.name}, ${destination.country}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
        <div className="absolute top-3 right-3 flex items-center gap-1 rounded-lg bg-card/90 backdrop-blur-sm px-2.5 py-1">
          <Star className="h-3.5 w-3.5 text-sunset fill-sunset" />
          <span className="text-xs font-bold text-foreground">{destination.rating}</span>
        </div>
        {destination.featured && (
          <div className="absolute top-3 left-3 rounded-lg gradient-sunset px-2.5 py-1">
            <span className="text-xs font-bold text-accent-foreground">Featured</span>
          </div>
        )}
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-lg font-bold font-display text-primary-foreground drop-shadow-lg">
            {destination.name}
          </h3>
          <div className="flex items-center gap-1 text-primary-foreground/80">
            <MapPin className="h-3.5 w-3.5" />
            <span className="text-xs font-medium">{destination.country}</span>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {destination.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {destination.moods.slice(0, 3).map((mood) => (
            <span
              key={mood}
              className="text-xs font-medium px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground capitalize"
            >
              {mood}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs font-medium text-muted-foreground capitalize">
            {destination.priceRange} &bull; {destination.climate}
          </span>
          <Link to={`/destination/${destination._id}`}>
            <Button size="sm" variant="default">
              Explore
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
