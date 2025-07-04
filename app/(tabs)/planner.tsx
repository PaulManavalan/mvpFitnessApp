import { useRouter } from 'expo-router';
import { Button, StyleSheet, Text, useColorScheme, View } from 'react-native';

export default function PlannerScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  const isDarkMode = colorScheme === 'dark';
  const textColor = isDarkMode ? '#fff' : '#000';
  const backgroundColor = isDarkMode ? '#121212' : '#fff';

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.title, { color: textColor }]}>
        Daily Planner Screen 📅
      </Text>
      <Button title="Back to Home" onPress={() => router.back()} color={isDarkMode ? '#BB86FC' : '#6200EE'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24 },
});
