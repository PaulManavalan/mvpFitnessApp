import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  const isDarkMode = colorScheme === 'dark';
  const textColor = isDarkMode ? '#fff' : '#000';
  const backgroundColor = isDarkMode ? '#121212' : '#fff';
  const cardColor = isDarkMode ? '#1f1f1f' : '#f0f0f0';

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.title, { color: textColor }]}>Fitness MVP</Text>
      <Text style={[styles.subtitle, { color: textColor }]}>
        Your Personal Fitness Planner 💪
      </Text>

      <TouchableOpacity style={[styles.card, { backgroundColor: cardColor }]} onPress={() => router.push('/planner')}>
        <MaterialCommunityIcons name="calendar-check" size={30} color="#6200EE" />
        <Text style={[styles.cardText, { color: textColor }]}>Daily Planner</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.card, { backgroundColor: cardColor }]} onPress={() => router.push('/meals')}>
        <MaterialCommunityIcons name="food" size={30} color="#6200EE" />
        <Text style={[styles.cardText, { color: textColor }]}>Meal Suggestions</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.card, { backgroundColor: cardColor }]} onPress={() => console.log('/progress')}>
        <MaterialCommunityIcons name="chart-line" size={30} color="#6200EE" />
        <Text style={[styles.cardText, { color: textColor }]}>Progress Tracker</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.card, { backgroundColor: cardColor }]} onPress={() => console.log('Feature coming soon!')}>
        <MaterialCommunityIcons name="robot" size={30} color="#6200EE" />
        <Text style={[styles.cardText, { color: textColor }]}>AI Assistant</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, marginBottom: 30, textAlign: 'center' },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '90%',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3, // shadow for Android
    shadowColor: '#000', // shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardText: { fontSize: 18, marginLeft: 15 },
});
