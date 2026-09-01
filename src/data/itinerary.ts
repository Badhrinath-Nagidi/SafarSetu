export type Activity = {
  time: string;
  title: string;
  description: string;
  category: string;
  cost: number;
};

export type DayPlan = {
  day: number;
  title: string;
  activities: Activity[];
};

export const meghalayaItinerary: DayPlan[] = [
  {
    day: 1,
    title: 'Arrival & Shillong',
    activities: [
      {
        time: '09:00 AM',
        title: 'Arrive in Guwahati',
        description: 'Begin your journey from Guwahati airport.',
        category: 'Transport',
        cost: 0,
      },
      {
        time: '11:00 AM',
        title: 'Travel to Shillong',
        description: 'Road journey from Guwahati to Shillong.',
        category: 'Transport',
        cost: 1200,
      },
      {
        time: '02:00 PM',
        title: 'Hotel Check-in',
        description: 'Check in and settle into your accommodation.',
        category: 'Stay',
        cost: 2500,
      },
      {
        time: '07:00 PM',
        title: 'Local Dinner',
        description: 'Explore local Meghalaya cuisine.',
        category: 'Food',
        cost: 800,
      },
    ],
  },
  {
    day: 2,
    title: 'Waterfalls & Shillong',
    activities: [
      {
        time: '09:00 AM',
        title: 'Elephant Falls',
        description: 'Explore one of Shillong’s popular waterfalls.',
        category: 'Nature',
        cost: 200,
      },
      {
        time: '12:00 PM',
        title: 'Local Lunch',
        description: 'Try a local meal in Shillong.',
        category: 'Food',
        cost: 600,
      },
      {
        time: '02:00 PM',
        title: 'Shillong Peak',
        description: 'Enjoy panoramic views of Shillong.',
        category: 'Nature',
        cost: 300,
      },
      {
        time: '05:00 PM',
        title: 'Local Market',
        description: 'Explore local shops and cultural products.',
        category: 'Culture',
        cost: 500,
      },
    ],
  },
  {
    day: 3,
    title: 'Living Root Bridges',
    activities: [
      {
        time: '07:00 AM',
        title: 'Travel to Cherrapunji',
        description: 'Start an early journey towards Cherrapunji.',
        category: 'Transport',
        cost: 1500,
      },
      {
        time: '10:00 AM',
        title: 'Living Root Bridges',
        description: 'Experience Meghalaya’s iconic living root bridges.',
        category: 'Adventure',
        cost: 500,
      },
      {
        time: '03:00 PM',
        title: 'Local Café',
        description: 'Relax and enjoy refreshments.',
        category: 'Food',
        cost: 400,
      },
    ],
  },
  {
    day: 4,
    title: 'Nature & Adventure',
    activities: [
      {
        time: '09:00 AM',
        title: 'Canyon & Viewpoint',
        description: 'Explore scenic landscapes and viewpoints.',
        category: 'Nature',
        cost: 500,
      },
      {
        time: '01:00 PM',
        title: 'Adventure Activity',
        description: 'Choose a suitable outdoor activity.',
        category: 'Adventure',
        cost: 1000,
      },
      {
        time: '06:00 PM',
        title: 'Cultural Experience',
        description: 'Experience local culture and traditions.',
        category: 'Culture',
        cost: 700,
      },
    ],
  },
  {
    day: 5,
    title: 'Relax & Departure',
    activities: [
      {
        time: '09:00 AM',
        title: 'Breakfast',
        description: 'Enjoy a relaxed final breakfast.',
        category: 'Food',
        cost: 400,
      },
      {
        time: '11:00 AM',
        title: 'Souvenir Shopping',
        description: 'Pick up local souvenirs.',
        category: 'Shopping',
        cost: 1000,
      },
      {
        time: '02:00 PM',
        title: 'Return to Guwahati',
        description: 'Travel back for departure.',
        category: 'Transport',
        cost: 1200,
      },
    ],
  },
];