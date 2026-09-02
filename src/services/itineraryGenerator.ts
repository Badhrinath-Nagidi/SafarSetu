import {
    meghalayaActivities,
    TravelActivity,
} from '@/data/meghalaya';

export type GeneratedActivity = TravelActivity & {
  time ?: string;
  day: number;
};

export type GeneratedDay = {
  day: number;
  title: string;
  activities: GeneratedActivity[];
};

export type GeneratedItinerary = {
  days: GeneratedDay[];
  totalCost: number;
};

const INTEREST_PRIORITY: Record<string, string[]> = {
  Nature: ['Nature', 'Adventure', 'Culture', 'Food'],
  Adventure: ['Adventure', 'Nature', 'Culture', 'Food'],
  Culture: ['Culture', 'Food', 'Nature', 'Adventure'],
  Food: ['Food', 'Culture', 'Nature', 'Adventure'],
};

function normalizeInterests(interests: string): string[] {
  return interests
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function getPrioritizedActivities(interests: string[]): TravelActivity[] {
  const primaryInterest = interests[0] ?? 'Nature';
  const priority =
    INTEREST_PRIORITY[primaryInterest] ?? INTEREST_PRIORITY.Nature;

  return [...meghalayaActivities].sort((a, b) => {
    const aPriority = priority.indexOf(a.category);
    const bPriority = priority.indexOf(b.category);

    return (
      (aPriority === -1 ? 999 : aPriority) -
      (bPriority === -1 ? 999 : bPriority)
    );
  });
}

function calculateDailyBudget(
  totalBudget: number,
  numberOfDays: number
): number {
  return Math.max(totalBudget / numberOfDays, 0);
}

export function generateItinerary(
  days: number,
  budget: number,
  interestsText: string
): GeneratedItinerary {
  const safeDays = Math.max(1, Math.min(days, 7));
  const normalizedInterests = normalizeInterests(interestsText);

  const prioritizedActivities =
    getPrioritizedActivities(normalizedInterests);

  const dailyBudget = calculateDailyBudget(budget, safeDays);

  const result: GeneratedDay[] = [];
  const usedActivityIds = new Set<string>();

  for (let day = 1; day <= safeDays; day += 1) {
    const selectedActivities: GeneratedActivity[] = [];
    let currentDayCost = 0;

    for (const activity of prioritizedActivities) {
      if (usedActivityIds.has(activity.id)) {
        continue;
      }

      if (currentDayCost + activity.cost > dailyBudget) {
        continue;
      }

      if (selectedActivities.length >= 2) {
        break;
      }

      selectedActivities.push({
        ...activity,
        day,
      });

      usedActivityIds.add(activity.id);
      currentDayCost += activity.cost;
    }

    result.push({
      day,
      title:
        day === 1
          ? 'Arrival & Exploration'
          : day === safeDays
            ? 'Relax & Departure'
            : 'Explore Meghalaya',
      activities: selectedActivities,
    });
  }

  const selectedCost = result.reduce(
    (total, day) =>
      total +
      day.activities.reduce(
        (dayTotal, activity) => dayTotal + activity.cost,
        0
      ),
    0
  );

  return {
    days: result,
    totalCost: selectedCost,
  };
}