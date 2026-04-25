import { destinations } from '@/data';
import { DestinationCard } from '@/components/DestinationCard';
import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const filters = ['All', 'Adventurous', 'Relaxed', 'Romantic', 'Cultural', 'Energetic', 'Peaceful'];

export function DestinationsPage() {
  const [search, setSearch] = useState('');
  const [activeMood, setActiveMood] = useState('All');

  const filtered = destinations.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.country.toLowerCase().includes(search.toLowerCase());
    const matchesMood = activeMood === 'All' || d.moods.includes(activeMood.toLowerCase());
    return matchesSearch && matchesMood;
  });

  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h1 className="text-4xl md:text-5xl font-bold font-display text-foreground">
            All Destinations
          </h1>
          <p className="text-muted-foreground mt-4 text-lg">
            Explore our curated collection of travel destinations worldwide.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="max-w-2xl mx-auto mb-10 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search destinations or countries..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-11"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveMood(f)}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                  activeMood === f
                    ? "gradient-ocean text-primary-foreground shadow-ocean"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((d) => (
              <DestinationCard key={d._id} destination={d} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">
              No destinations match your search. Try different keywords.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
