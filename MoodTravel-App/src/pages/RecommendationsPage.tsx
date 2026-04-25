import { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Sparkles, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DestinationCard } from '@/components/DestinationCard';
import { getRecommendations } from '@/lib/recommend';
import type { MoodAnswer } from '@/types';

export function RecommendationsPage() {
  const [params] = useSearchParams();

  const answers: MoodAnswer = {
    mood: params.get('mood') || '',
    travelStyle: params.get('travelStyle') || '',
    budget: params.get('budget') || '',
    climate: params.get('climate') || '',
    activity: params.get('activity') || '',
  };

  const results = useMemo(() => getRecommendations(answers), [answers.mood, answers.travelStyle, answers.budget, answers.climate, answers.activity]);

  const moodEmojis: Record<string, string> = {
    adventurous: '🏔️',
    relaxed: '🏖️',
    romantic: '💕',
    cultural: '🏛️',
    energetic: '⚡',
    peaceful: '🧘',
  };

  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 mb-4">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-accent">Personalized for you</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-display text-foreground">
            Your Perfect Matches
          </h1>
          <p className="text-muted-foreground mt-4 text-lg">
            Based on your <span className="font-semibold text-foreground">{moodEmojis[answers.mood]} {answers.mood}</span> mood, 
            here are the destinations we think you will love.
          </p>
        </div>

        {/* Mood Summary */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {[
            { label: 'Mood', value: answers.mood },
            { label: 'Budget', value: answers.budget },
            { label: 'Climate', value: answers.climate },
            { label: 'Activity', value: answers.activity },
          ].map((tag) => (
            <span
              key={tag.label}
              className="px-4 py-2 rounded-xl bg-secondary text-sm font-medium text-foreground capitalize"
            >
              {tag.label}: {tag.value}
            </span>
          ))}
        </div>

        {/* Results */}
        {results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {results.map((dest) => (
              <DestinationCard key={dest._id} destination={dest} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">No matching destinations found. Try different preferences!</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-center gap-4">
          <Link to="/questionnaire">
            <Button variant="outline" size="lg">
              <RotateCcw className="h-4 w-4 mr-2" />
              Retake Quiz
            </Button>
          </Link>
          <Link to="/destinations">
            <Button variant="default" size="lg">
              Browse All Destinations
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
