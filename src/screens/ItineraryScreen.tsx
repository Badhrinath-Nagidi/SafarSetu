import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Activity = {
  time: string;
  title: string;
  description: string;
  category: string;
  cost: number;
};

type DayPlan = {
  day: number;
  title: string;
  activities: Activity[];
};

const itinerary: DayPlan[] = [
  {
    day: 1,
    title: 'Arrival & Shillong',
    activities: [
      {
        time: '09:00 AM',
        title: 'Arrive in Guwahati',
        description: 'Begin your journey from Guwahati.',
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

export default function ItineraryScreen() {
  const totalCost = itinerary.reduce(
    (total, day) =>
      total +
      day.activities.reduce(
        (dayTotal, activity) => dayTotal + activity.cost,
        0
      ),
    0
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.eyebrow}>YOUR JOURNEY</Text>

        <Text style={styles.title}>Meghalaya</Text>

        <Text style={styles.subtitle}>
          Your 5-day journey, organized around nature, adventure and local
          experiences.
        </Text>

        <View style={styles.summaryCard}>
          <View>
            <Text style={styles.summaryLabel}>DURATION</Text>
            <Text style={styles.summaryValue}>5 Days</Text>
          </View>

          <View>
            <Text style={styles.summaryLabel}>ESTIMATED COST</Text>
            <Text style={styles.summaryValue}>
              ₹{totalCost.toLocaleString('en-IN')}
            </Text>
          </View>
        </View>

        {itinerary.map((day) => (
          <View key={day.day} style={styles.daySection}>
            <View style={styles.dayHeader}>
              <View style={styles.dayNumber}>
                <Text style={styles.dayNumberText}>{day.day}</Text>
              </View>

              <View style={styles.dayTitleContainer}>
                <Text style={styles.dayLabel}>DAY {day.day}</Text>
                <Text style={styles.dayTitle}>{day.title}</Text>
              </View>
            </View>

            {day.activities.map((activity) => (
              <View
                key={`${day.day}-${activity.time}-${activity.title}`}
                style={styles.activityCard}
              >
                <View style={styles.activityTime}>
                  <Text style={styles.time}>{activity.time}</Text>
                </View>

                <View style={styles.activityContent}>
                  <Text style={styles.category}>{activity.category}</Text>

                  <Text style={styles.activityTitle}>
                    {activity.title}
                  </Text>

                  <Text style={styles.description}>
                    {activity.description}
                  </Text>

                  {activity.cost > 0 && (
                    <Text style={styles.cost}>
                      Estimated: ₹{activity.cost.toLocaleString('en-IN')}
                    </Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F7F6',
  },

  container: {
    paddingHorizontal: 20,
    paddingVertical: 28,
    paddingBottom: 40,
  },

  eyebrow: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.4,
    color: '#78908A',
  },

  title: {
    marginTop: 5,
    fontSize: 34,
    fontWeight: '800',
    color: '#183B35',
  },

  subtitle: {
    marginTop: 8,
    marginBottom: 22,
    fontSize: 15,
    lineHeight: 22,
    color: '#687A76',
  },

  summaryCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#183B35',
    borderRadius: 20,
    padding: 20,
    marginBottom: 28,
  },

  summaryLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    color: '#B9D0CA',
  },

  summaryValue: {
    marginTop: 5,
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  daySection: {
    marginBottom: 26,
  },

  dayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  dayNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DCEBE6',
  },

  dayNumberText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#183B35',
  },

  dayTitleContainer: {
    marginLeft: 12,
    flex: 1,
  },

  dayLabel: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    color: '#78908A',
  },

  dayTitle: {
    marginTop: 2,
    fontSize: 19,
    fontWeight: '700',
    color: '#183B35',
  },

  activityCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 10,
  },

  activityTime: {
    width: 76,
  },

  time: {
    fontSize: 12,
    fontWeight: '700',
    color: '#78908A',
  },

  activityContent: {
    flex: 1,
  },

  category: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: '#5A746D',
  },

  activityTitle: {
    marginTop: 3,
    fontSize: 16,
    fontWeight: '700',
    color: '#20332F',
  },

  description: {
    marginTop: 5,
    fontSize: 13,
    lineHeight: 19,
    color: '#687A76',
  },

  cost: {
    marginTop: 7,
    fontSize: 12,
    fontWeight: '700',
    color: '#183B35',
  },
});