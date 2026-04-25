import type { Destination, MoodAnswer } from '@/types';
import { destinations } from '@/data';

export function getRecommendations(answers: MoodAnswer): Destination[] {
  const scored = destinations.map((dest) => {
    let score = 0;

    // Mood match (highest weight)
    if (dest.moods.includes(answers.mood)) {
      score += 40;
    }

    // Budget match
    if (dest.priceRange === answers.budget) {
      score += 25;
    }

    // Climate match
    if (dest.climate === answers.climate) {
      score += 20;
    }

    // Activity match
    if (dest.activities.some((a) => a.toLowerCase().includes(answers.activity.toLowerCase()))) {
      score += 15;
    }

    // Bonus for featured
    if (dest.featured) {
      score += 5;
    }

    // Bonus for high rating
    score += dest.rating * 2;

    return { destination: dest, score };
  });

  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, 5).map((s) => s.destination);
}
