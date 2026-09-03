import { generateItinerary } from '@/services/itineraryGenerator';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type ItineraryScreenProps = {
  destination: string;
  from: string;
  days: string;
  budget: string;
  interests: string;
};

export default function ItineraryScreen({
  destination,
  from,
  days,
  budget,
  interests,
}: ItineraryScreenProps) {
  const generatedItinerary = generateItinerary(
    Number(days),
    Number(budget.replace(/[^0-9]/g, '')),
    interests
  );

  const itinerary = generatedItinerary.days;
  const totalCost = generatedItinerary.totalCost;
  const disruptionTarget = itinerary
  .flatMap((day) => day.activities)[0];
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.eyebrow}>YOUR JOURNEY</Text>

        <Text style={styles.title}>{destination}</Text>

        <Text style={styles.subtitle}>
          {days}-day journey from {from}, built around your selected interests.
        </Text>

        <View style={styles.summaryCard}>
  <View>
    <Text style={styles.summaryLabel}>DURATION</Text>
    <Text style={styles.summaryValue}>{days} Days</Text>
  </View>

  <View>
    <Text style={styles.summaryLabel}>ESTIMATED COST</Text>
    <Text style={styles.summaryValue}>
      ₹{totalCost.toLocaleString('en-IN')}
    </Text>
  </View>
</View>

<View style={styles.preferenceCard}>
  <Text style={styles.preferenceTitle}>YOUR PREFERENCES</Text>

  <Text style={styles.preferenceText}>
    Budget: ₹{Number(budget).toLocaleString('en-IN')}
  </Text>

  <Text style={styles.preferenceText}>
    Interests:{' '}
    {interests
      ? interests.split(',').join(' • ')
      : 'General exploration'}
  </Text>
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
        <Pressable
  onPress={() => {
    if (!disruptionTarget) {
      return;
    }

    router.push({
      pathname: '/replan',
      params: {
        days,
        budget,
        interests,
        activityId: disruptionTarget.id,
      },
    });
  }}
  style={styles.replanButton}
>
  <Text style={styles.replanButtonText}>
    ⚠️ SIMULATE TRAVEL DISRUPTION
  </Text>
</Pressable>
    <Pressable
  onPress={() =>
    router.push({
      pathname: '/travel-hub',
      params: {
        destination,
      },
    })
  }
  style={styles.travelHubButton}
>
  <Text style={styles.travelHubButtonText}>
    🔗 EXPLORE TRAVEL SERVICES
  </Text>
</Pressable>
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

  preferenceCard: {
  backgroundColor: '#FFFFFF',
  borderRadius: 18,
  padding: 18,
  marginBottom: 28,
  borderWidth: 1,
  borderColor: '#E2E9E6',
},

preferenceTitle: {
  fontSize: 11,
  fontWeight: '800',
  letterSpacing: 1,
  color: '#78908A',
  marginBottom: 8,
},

preferenceText: {
  fontSize: 14,
  color: '#42534F',
  marginTop: 4,
},
replanButton: {
  height: 54,
  marginTop: 10,
  marginBottom: 20,
  borderRadius: 16,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#A65A00',
},

replanButtonText: {
  fontSize: 13,
  fontWeight: '800',
  color: '#FFFFFF',
},
travelHubButton: {
  height: 54,
  marginTop: 10,
  marginBottom: 20,
  borderRadius: 16,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#DCEBE6',
},

travelHubButtonText: {
  fontSize: 13,
  fontWeight: '800',
  color: '#183B35',
},
});