import {
    TravelActivity,
} from '@/data/meghalaya';

import {
    GeneratedActivity,
    GeneratedDay,
    GeneratedItinerary,
} from '@/services/itineraryGenerator';

export type Disruption = {
  activityId: string;
  reason: string;
};

export type ReplannedItinerary = {
  itinerary: GeneratedItinerary;
  disruptedActivity: GeneratedActivity;
  replacementActivity?: TravelActivity;
};

const ALTERNATIVE_ACTIVITIES: TravelActivity[] = [
  {
    id: 'local-market',
    title: 'Local Market',
    description: 'Explore local shops, crafts and cultural products.',
    category: 'Culture',
    durationHours: 2,
    cost: 500,
    location: 'Shillong',
  },
  {
    id: 'cultural-experience',
    title: 'Local Cultural Experience',
    description: 'Discover local traditions, music and culture.',
    category: 'Culture',
    durationHours: 2,
    cost: 700,
    location: 'Shillong',
  },
  {
    id: 'local-cafe',
    title: 'Local Café Experience',
    description: 'Relax and enjoy local refreshments.',
    category: 'Food',
    durationHours: 1.5,
    cost: 400,
    location: 'Shillong',
  },
  {
    id: 'shillong-peak',
    title: 'Shillong Peak',
    description: 'Enjoy panoramic views of Shillong.',
    category: 'Nature',
    durationHours: 2,
    cost: 300,
    location: 'Shillong',
  },
];

function getBestReplacement(
  disruptedActivity: GeneratedActivity,
  currentItinerary: GeneratedItinerary,
  interests: string
): TravelActivity | undefined {
  const preferredInterests = interests
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

  const existingActivityIds = new Set(
    currentItinerary.days.flatMap((day) =>
      day.activities.map((activity) => activity.id)
    )
  );

  const availableAlternatives = ALTERNATIVE_ACTIVITIES.filter(
    (activity) =>
      activity.id !== disruptedActivity.id &&
      !existingActivityIds.has(activity.id)
  );

  const matchingActivity = availableAlternatives.find((activity) =>
    preferredInterests.includes(activity.category)
  );

  return matchingActivity ?? availableAlternatives[0];
}

export function replanItinerary(
  currentItinerary: GeneratedItinerary,
  disruption: Disruption,
  interests: string
): ReplannedItinerary | null {
  let disruptedActivity: GeneratedActivity | undefined;

  const updatedDays: GeneratedDay[] = currentItinerary.days.map((day) => {
    const updatedActivities = day.activities.filter((activity) => {
      if (activity.id === disruption.activityId) {
        disruptedActivity = activity;
        return false;
      }

      return true;
    });

    return {
      ...day,
      activities: updatedActivities,
    };
  });

  if (!disruptedActivity) {
    return null;
  }

  const replacementActivity = getBestReplacement(
  disruptedActivity,
  currentItinerary,
  interests
);

  if (replacementActivity) {
    const affectedDayIndex = updatedDays.findIndex(
      (day) => day.day === disruptedActivity!.day
    );

    if (affectedDayIndex !== -1) {
      updatedDays[affectedDayIndex] = {
        ...updatedDays[affectedDayIndex],
        activities: [
          ...updatedDays[affectedDayIndex].activities,
          {
            ...replacementActivity,
            day: disruptedActivity.day,
            time : '10:00 AM',
          },
        ],
      };
    }
  }

  const totalCost = updatedDays.reduce(
    (total, day) =>
      total +
      day.activities.reduce(
        (dayTotal, activity) => dayTotal + activity.cost,
        0
      ),
    0
  );

  return {
    itinerary: {
      days: updatedDays,
      totalCost,
    },
    disruptedActivity,
    replacementActivity,
  };
}