import { useLocalSearchParams } from 'expo-router';

import ItineraryScreen from '@/screens/ItineraryScreen';

export default function ItineraryRoute() {
  const { destination, from, days, budget, interests } =
    useLocalSearchParams<{
      destination?: string;
      from?: string;
      days?: string;
      budget?: string;
      interests?: string;
    }>();

  return (
    <ItineraryScreen
      destination={destination ?? 'Meghalaya'}
      from={from ?? 'Hyderabad'}
      days={days ?? '5'}
      budget={budget ?? '30000'}
      interests={interests ?? ''}
    />
  );
}