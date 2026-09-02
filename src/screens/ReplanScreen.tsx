import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { generateItinerary } from '@/services/itineraryGenerator';
import { replanItinerary } from '@/services/replanningEngine';

export default function ReplanScreen() {
  const {
  days = '5',
  budget = '30000',
  interests = 'Nature,Adventure',
  activityId = '',
} = useLocalSearchParams<{
  days?: string;
  budget?: string;
  interests?: string;
  activityId?: string;
}>();

  const currentItinerary = generateItinerary(
    Number(days),
    Number(budget.replace(/[^0-9]/g, '')),
    interests
  );

  const result = replanItinerary(
  currentItinerary,
  {
    activityId,
    reason: 'Temporary route disruption',
  },
  interests
);

  if (!result) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.center}>
          <Text style={styles.errorTitle}>Unable to replan</Text>
          <Text style={styles.errorText}>
            The affected activity could not be found.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.eyebrow}>JOURNEY ALERT</Text>

<Text style={styles.title}>Your plan has changed</Text>

<Text style={styles.subtitle}>
  SafarSetu detected a disruption and adjusted the affected part of your journey.
</Text>

<View style={styles.disruptionCard}>
  <Text style={styles.disruptionLabel}>⚠️ REMOVED FROM YOUR PLAN</Text>

  <Text style={styles.disruptionTitle}>
    {result.disruptedActivity.title}
  </Text>

  <Text style={styles.disruptionDescription}>
    {result.disruptedActivity.description}
  </Text>

  <View style={styles.reasonBadge}>
    <Text style={styles.reasonText}>
      Temporary route disruption
    </Text>
  </View>
</View>

<View style={styles.arrowContainer}>
  <Text style={styles.arrow}>↓</Text>
</View>

{result.replacementActivity && (
  <View style={styles.replacementCard}>
    <Text style={styles.replacementLabel}>
      ✨ ADDED IN ITS PLACE
    </Text>

    <Text style={styles.replacementTitle}>
      {result.replacementActivity.title}
    </Text>

    <Text style={styles.replacementDescription}>
      {result.replacementActivity.description}
    </Text>

    <View style={styles.replacementMeta}>
      <Text style={styles.replacementMetaText}>
        {result.replacementActivity.category}
      </Text>

      <Text style={styles.replacementMetaText}>
        ₹{result.replacementActivity.cost.toLocaleString('en-IN')}
      </Text>
    </View>
  </View>
)}

<Text style={styles.sectionTitle}>🔄 Updated journey</Text>

<View style={styles.summaryCard}>
  <View>
    <Text style={styles.summaryLabel}>UPDATED COST</Text>
    <Text style={styles.summaryValue}>
      ₹{result.itinerary.totalCost.toLocaleString('en-IN')}
    </Text>
  </View>

  <View>
    <Text style={styles.summaryLabel}>STATUS</Text>
    <Text style={styles.summaryValue}>Updated</Text>
  </View>
</View>

{result.itinerary.days.map((day) => (
  <View key={day.day} style={styles.dayCard}>
    <Text style={styles.dayTitle}>
      Day {day.day} — {day.title}
    </Text>

    {day.activities.map((activity) => (
      <View
        key={`${day.day}-${activity.id}`}
        style={styles.activityRow}
      >
        <Text style={styles.activityTime}>
          {activity.time}
        </Text>

        <View style={styles.activityInfo}>
          <Text style={styles.activityTitle}>
            {activity.title}
          </Text>

          <Text style={styles.activityCategory}>
            {activity.category}
          </Text>
        </View>
      </View>
    ))}
  </View>
))}

<Pressable
  onPress={() => router.back()}
  style={styles.backButton}
>
  <Text style={styles.backButtonText}>BACK TO JOURNEY</Text>
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
    padding: 20,
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
    fontSize: 32,
    fontWeight: '800',
    color: '#183B35',
  },
  reason: {
    marginTop: 10,
    fontSize: 12,
    fontWeight: '700',
    color: '#8A6D3B',
  },

  sectionTitle: {
    marginTop: 26,
    marginBottom: 12,
    fontSize: 18,
    fontWeight: '800',
    color: '#183B35',
  },

  replacementCard: {
    padding: 18,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDE8E4',
  },

  replacementLabel: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    color: '#78908A',
  },

  replacementTitle: {
    marginTop: 6,
    fontSize: 19,
    fontWeight: '800',
    color: '#183B35',
  },

  replacementDescription: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 20,
    color: '#64736F',
  },

  summaryCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
    padding: 18,
    borderRadius: 18,
    backgroundColor: '#183B35',
  },

  summaryLabel: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
    color: '#B9D0CA',
  },

  summaryValue: {
    marginTop: 4,
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  dayCard: {
    marginBottom: 12,
    padding: 16,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
  },

  dayTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#183B35',
    marginBottom: 12,
  },

  activityRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#EEF2F0',
  },
    activityInfo: {
    flex: 1,
  },

  activityTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#20332F',
  },

  activityCategory: {
    marginTop: 2,
    fontSize: 11,
    color: '#78908A',
  },

  backButton: {
    height: 52,
    marginTop: 20,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#183B35',
  },

  backButtonText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  errorTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#183B35',
  },

  errorText: {
    marginTop: 8,
    textAlign: 'center',
    color: '#687A76',
  },
  subtitle: {
  marginTop: 8,
  fontSize: 15,
  lineHeight: 22,
  color: '#687A76',
},

disruptionCard: {
  marginTop: 22,
  padding: 20,
  borderRadius: 20,
  backgroundColor: '#FFF4E3',
  borderWidth: 1,
  borderColor: '#F1D5AA',
},

disruptionLabel: {
  fontSize: 11,
  fontWeight: '800',
  letterSpacing: 1,
  color: '#9A691F',
},

disruptionTitle: {
  marginTop: 10,
  fontSize: 21,
  fontWeight: '800',
  color: '#5B431F',
},

disruptionDescription: {
  marginTop: 6,
  fontSize: 14,
  lineHeight: 21,
  color: '#765B35',
},

reasonBadge: {
  alignSelf: 'flex-start',
  marginTop: 12,
  paddingHorizontal: 10,
  paddingVertical: 6,
  borderRadius: 10,
  backgroundColor: '#F8DFB7',
},

reasonText: {
  fontSize: 11,
  fontWeight: '700',
  color: '#8B611F',
},

arrowContainer: {
  alignItems: 'center',
  paddingVertical: 8,
},

arrow: {
  fontSize: 28,
  fontWeight: '800',
  color: '#78908A',
},
replacementMeta: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 14,
},

replacementMetaText: {
  fontSize: 12,
  fontWeight: '700',
  color: '#397468',
},
activityTime: {
  width: 76,
  fontSize: 12,
  fontWeight: '700',
  color: '#78908A',
},
});