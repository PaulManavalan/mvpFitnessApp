import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Button, StyleSheet, Text, useColorScheme, View } from 'react-native';

export default function ProgressScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const [steps, setSteps] = useState(0);
  const textColor = isDarkMode ? '#fff' : '#000';
  const backgroundColor = isDarkMode ? '#121212' : '#fff';

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.title, { color: textColor }]}>Progress Tracker 📊</Text>
      <Text style={[styles.steps, { color: textColor }]}>Steps Today: {steps}</Text>

      <Button title="Add 500 Steps" onPress={() => setSteps(steps + 500)} color={isDarkMode ? '#BB86FC' : '#6200EE'} />
      <Button title="Back to Home" onPress={() => router.back()} color={isDarkMode ? '#BB86FC' : '#6200EE'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  steps: { fontSize: 20, marginBottom: 30 },
});
