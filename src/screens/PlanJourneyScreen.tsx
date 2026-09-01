import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const INTERESTS = ['Nature', 'Adventure', 'Culture', 'Food'];

export default function HomeScreen() {
  const [destination, setDestination] = useState('');
  const [from, setFrom] = useState('');
  const [days, setDays] = useState('');
  const [budget, setBudget] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((current) =>
      current.includes(interest)
        ? current.filter((item) => item !== interest)
        : [...current, interest]
    );
  };

  const handlePlanJourney = () => {
    console.log({
      destination,
      from,
      days,
      budget,
      interests: selectedInterests,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.logo}>🌉</Text>

          <Text style={styles.appName}>SafarSetu</Text>

          <Text style={styles.tagline}>Your Journey, Connected.</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Plan Your Journey</Text>

          <Text style={styles.subtitle}>
            Tell us what you want from your trip.
          </Text>

          <View style={styles.field}>
            <Text style={styles.label}>Where are you going?</Text>

            <TextInput
              value={destination}
              onChangeText={setDestination}
              placeholder="e.g. Meghalaya"
              placeholderTextColor="#8A8A8A"
              style={styles.input}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Travelling from</Text>

            <TextInput
              value={from}
              onChangeText={setFrom}
              placeholder="e.g. Hyderabad"
              placeholderTextColor="#8A8A8A"
              style={styles.input}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Number of days</Text>

            <TextInput
              value={days}
              onChangeText={setDays}
              placeholder="e.g. 5"
              placeholderTextColor="#8A8A8A"
              keyboardType="number-pad"
              style={styles.input}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Budget</Text>

            <TextInput
              value={budget}
              onChangeText={setBudget}
              placeholder="e.g. ₹30,000"
              placeholderTextColor="#8A8A8A"
              style={styles.input}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>What do you enjoy?</Text>

            <View style={styles.interestsContainer}>
              {INTERESTS.map((interest) => {
                const selected = selectedInterests.includes(interest);

                return (
                  <Pressable
                    key={interest}
                    onPress={() => toggleInterest(interest)}
                    style={[
                      styles.interestButton,
                      selected && styles.interestButtonSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.interestText,
                        selected && styles.interestTextSelected,
                      ]}
                    >
                      {interest}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <Pressable
            onPress={handlePlanJourney}
            style={({ pressed }) => [
              styles.planButton,
              pressed && styles.planButtonPressed,
            ]}
          >
            <Text style={styles.planButtonText}>PLAN MY JOURNEY</Text>
          </Pressable>
        </View>
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
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 32,
  },

  header: {
    alignItems: 'center',
    marginBottom: 28,
  },

  logo: {
    fontSize: 42,
    marginBottom: 6,
  },

  appName: {
    fontSize: 32,
    fontWeight: '800',
    color: '#183B35',
  },

  tagline: {
    marginTop: 4,
    fontSize: 15,
    color: '#60736F',
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 22,
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 3,
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#183B35',
  },

  subtitle: {
    marginTop: 6,
    marginBottom: 24,
    fontSize: 15,
    lineHeight: 22,
    color: '#687A76',
  },

  field: {
    marginBottom: 18,
  },

  label: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#314640',
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: '#D8E0DD',
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1D2926',
    backgroundColor: '#FAFBFA',
  },

  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  interestButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D5DEDA',
    backgroundColor: '#FFFFFF',
  },

  interestButtonSelected: {
    backgroundColor: '#183B35',
    borderColor: '#183B35',
  },

  interestText: {
    fontSize: 14,
    color: '#42534F',
  },

  interestTextSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },

  planButton: {
    height: 54,
    marginTop: 8,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#183B35',
  },

  planButtonPressed: {
    opacity: 0.8,
  },

  planButtonText: {
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.5,
    color: '#FFFFFF',
  },
});