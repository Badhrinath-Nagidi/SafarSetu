export type TravelActivity = {
  id: string;
  title: string;
  description: string;
  category: string;
  durationHours: number;
  cost: number;
  location: string;
};

export const meghalayaActivities: TravelActivity[] = [
  {
    id: 'elephant-falls',
    title: 'Elephant Falls',
    description: 'Visit a scenic waterfall near Shillong.',
    category: 'Nature',
    durationHours: 2,
    cost: 200,
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
  {
    id: 'root-bridges',
    title: 'Living Root Bridges',
    description: 'Explore Meghalaya’s famous living root bridges.',
    category: 'Adventure',
    durationHours: 4,
    cost: 500,
    location: 'Nongriat',
  },
  {
    id: 'cherrapunji',
    title: 'Cherrapunji Exploration',
    description: 'Explore the landscapes and viewpoints of Cherrapunji.',
    category: 'Nature',
    durationHours: 4,
    cost: 800,
    location: 'Cherrapunji',
  },
  {
    id: 'local-market',
    title: 'Local Market',
    description: 'Explore local products, crafts and shops.',
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
    id: 'local-food-tour',
    title: 'Meghalaya Food Tour',
    description: 'Explore regional dishes and local food spots.',
    category: 'Food',
    durationHours: 2,
    cost: 900,
    location: 'Shillong',
  },
  {
    id: 'local-cafe',
    title: 'Local Café Experience',
    description: 'Relax at a local café and try regional refreshments.',
    category: 'Food',
    durationHours: 1.5,
    cost: 400,
    location: 'Shillong',
  },
  {
    id: 'trekking',
    title: 'Guided Nature Trek',
    description: 'Take a guided trek through Meghalaya’s landscapes.',
    category: 'Adventure',
    durationHours: 4,
    cost: 1000,
    location: 'Meghalaya',
  },
  {
    id: 'canyon-viewpoint',
    title: 'Canyon Viewpoint',
    description: 'Visit a scenic viewpoint surrounded by hills.',
    category: 'Nature',
    durationHours: 2,
    cost: 500,
    location: 'Meghalaya',
  },
];