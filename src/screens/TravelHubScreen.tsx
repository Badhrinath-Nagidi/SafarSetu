import { router, useLocalSearchParams } from 'expo-router';
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Service = {
  id: string;
  title: string;
  description: string;
  meta: string;
  price: string;
  icon: string;
};

const services: Service[] = [
  {
    id: 'transport',
    title: 'Local Transport',
    description: 'Cab and shared transport for getting around Meghalaya.',
    meta: 'From Guwahati → Shillong',
    price: '₹1,200',
    icon: '🚕',
  },
  {
    id: 'stay',
    title: 'Accommodation',
    description: 'Comfortable stays selected around your itinerary.',
    meta: 'Shillong • 1 night',
    price: '₹1,500',
    icon: '🏨',
  },
  {
    id: 'rental',
    title: 'Bike Rental',
    description: 'Explore locally with flexible two-wheeler rentals.',
    meta: 'Daily rental',
    price: '₹600/day',
    icon: '🏍️',
  },
  {
    id: 'guide',
    title: 'Local Guide',
    description: 'Discover the region with a local guide.',
    meta: 'Half-day guided experience',
    price: '₹900',
    icon: '🧑‍🏫',
  },
  {
    id: 'experience',
    title: 'Local Experience',
    description: 'Food, culture and activities matched to your interests.',
    meta: 'Personalized selection',
    price: 'From ₹400',
    icon: '🎟️',
  },
];

export default function TravelHubScreen() {
  const { destination = 'Meghalaya' } = useLocalSearchParams<{
    destination?: string;
  }>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.eyebrow}>TRAVEL HUB</Text>

        <Text style={styles.title}>{destination}</Text>

        <Text style={styles.subtitle}>
          Everything you may need for your journey, organized in one place.
        </Text>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Your journey is connected</Text>
          <Text style={styles.infoText}>
            Explore transport, stays, rentals, guides and experiences around
            your itinerary.
          </Text>
        </View>

        {services.map((service) => (
          <Pressable
            key={service.id}
            style={({ pressed }) => [
              styles.serviceCard,
              pressed && styles.serviceCardPressed,
            ]}
          >
            <View style={styles.iconBox}>
              <Text style={styles.icon}>{service.icon}</Text>
            </View>

            <View style={styles.serviceContent}>
              <Text style={styles.serviceTitle}>{service.title}</Text>

              <Text style={styles.serviceDescription}>
                {service.description}
              </Text>

              <Text style={styles.serviceMeta}>{service.meta}</Text>
            </View>

            <View style={styles.priceBox}>
              <Text style={styles.price}>{service.price}</Text>
              <Text style={styles.viewText}>View</Text>
            </View>
          </Pressable>
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
    fontSize: 34,
    fontWeight: '800',
    color: '#183B35',
  },

  subtitle: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 22,
    color: '#687A76',
  },

  infoCard: {
    marginTop: 20,
    marginBottom: 20,
    padding: 18,
    borderRadius: 20,
    backgroundColor: '#E8F3EF',
  },

  infoTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#183B35',
  },

  infoText: {
    marginTop: 6,
    fontSize: 13,
    lineHeight: 20,
    color: '#56716A',
  },

  serviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    padding: 16,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E8E5',
  },

  serviceCardPressed: {
    opacity: 0.8,
  },

  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EDF5F2',
  },

  icon: {
    fontSize: 23,
  },

  serviceContent: {
    flex: 1,
    marginLeft: 12,
    marginRight: 10,
  },

  serviceTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#20332F',
  },

  serviceDescription: {
    marginTop: 4,
    fontSize: 12,
    lineHeight: 18,
    color: '#687A76',
  },

  serviceMeta: {
    marginTop: 6,
    fontSize: 11,
    fontWeight: '600',
    color: '#78908A',
  },

  priceBox: {
    alignItems: 'flex-end',
  },

  price: {
    fontSize: 13,
    fontWeight: '800',
    color: '#183B35',
  },

  viewText: {
    marginTop: 4,
    fontSize: 11,
    fontWeight: '700',
    color: '#5A746D',
  },

  backButton: {
    height: 52,
    marginTop: 12,
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
});