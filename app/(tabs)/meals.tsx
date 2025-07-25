import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Button, StyleSheet, Text, useColorScheme, View } from 'react-native';

const meals = [
  'Grilled Chicken Salad 🥗',
  'Oatmeal with Berries 🫐',
  'Steak with Sweet Potato 🥩',
  'Quinoa and Veggie Bowl 🍲',
  'Protein Smoothie 🥤',
];

export default function MealsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const [meal, setMeal] = useState(meals[0]);
  const textColor = isDarkMode ? '#fff' : '#000';
  const backgroundColor = isDarkMode ? '#121212' : '#fff';

  const getRandomMeal = () => {
    const random = meals[Math.floor(Math.random() * meals.length)];
    setMeal(random);
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.title, { color: textColor }]}>Meal Suggestions 🍽️</Text>
      <Text style={[styles.meal, { color: textColor }]}>{meal}</Text>

      <Button title="Suggest Another Meal" onPress={getRandomMeal} color={isDarkMode ? '#BB86FC' : '#6200EE'} />
      <Button title="Back to Home" onPress={() => router.back()} color={isDarkMode ? '#BB86FC' : '#6200EE'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  meal: { fontSize: 20, marginBottom: 30, textAlign: 'center' },
});
