import { addDays, addMonths, addYears, format, getDate, getDaysInMonth, getMonth, getYear, subDays, subMonths, subYears } from 'date-fns';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Button, FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Event Type
type Event = {
  id: string;
  title: string;
  date: Date;
};

export default function PlannerScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const [viewMode, setViewMode] = useState<'day' | 'month' | 'year'>('day');
  const [events, setEvents] = useState<Event[]>([]);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [adding, setAdding] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const textColor = isDarkMode ? '#fff' : '#000';
  const backgroundColor = isDarkMode ? '#121212' : '#fff';
  const cardColor = isDarkMode ? '#1f1f1f' : '#f0f0f0';
  const buttonColor = isDarkMode ? '#BB86FC' : '#6200EE';

  const todaysEvents = events.filter(e =>
    getDate(e.date) === getDate(currentDate) &&
    getMonth(e.date) === getMonth(currentDate) &&
    getYear(e.date) === getYear(currentDate)
  );

  const handleAddEvent = () => {
    if (newEventTitle.trim() === '') return;
    const newEvent: Event = { id: Date.now().toString(), title: newEventTitle, date: currentDate };
    setEvents([...events, newEvent]);
    setNewEventTitle('');
    setAdding(false);
  };

  const handleDelete = (id: string) => {
    Alert.alert('Delete Event', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => setEvents(events.filter(e => e.id !== id)) },
    ]);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.title, { color: textColor }]}>Daily Planner 📅</Text>

      <View style={styles.modeSwitch}>
        <Button title="Day" onPress={() => setViewMode('day')} color={buttonColor} />
        <Button title="Month" onPress={() => setViewMode('month')} color={buttonColor} />
        <Button title="Year" onPress={() => setViewMode('year')} color={buttonColor} />
      </View>

      {/* DAY VIEW */}
      {viewMode === 'day' && (
        <View style={styles.content}>
          <Text style={[styles.viewTitle, { color: textColor }]}>{format(currentDate, 'MMMM d, yyyy')}</Text>

          <View style={styles.navRow}>
            <Button title="Back" onPress={() => setCurrentDate(subDays(currentDate, 1))} color={buttonColor} />
            <Button title="Next" onPress={() => setCurrentDate(addDays(currentDate, 1))} color={buttonColor} />
          </View>

          <FlatList
            data={todaysEvents}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={<Text style={{ color: textColor }}>No events for this day.</Text>}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.eventCard, { backgroundColor: cardColor }]}
                onLongPress={() => handleDelete(item.id)}
              >
                <Text style={{ color: textColor }}>{item.title}</Text>
              </TouchableOpacity>
            )}
          />

          {adding ? (
            <View style={styles.addContainer}>
              <TextInput
                placeholder="Event Title"
                placeholderTextColor="#888"
                style={[styles.input, { color: textColor, borderColor: textColor }]}
                value={newEventTitle}
                onChangeText={setNewEventTitle}
              />
              <Button title="Add" onPress={handleAddEvent} color={buttonColor} />
              <Button title="Cancel" onPress={() => setAdding(false)} color="#888" />
            </View>
          ) : (
            <Button title="Add Event" onPress={() => setAdding(true)} color={buttonColor} />
          )}
        </View>
      )}

      {/* MONTH VIEW */}
      {viewMode === 'month' && (
        <View style={{ flex: 1 }}>
          <Text style={[styles.viewTitle, { color: textColor, textAlign: 'center' }]}>
            {format(currentDate, 'MMMM yyyy')}
          </Text>

          <View style={styles.navRow}>
            <Button title="Prev" onPress={() => setCurrentDate(subMonths(currentDate, 1))} color={buttonColor} />
            <Button title="Next" onPress={() => setCurrentDate(addMonths(currentDate, 1))} color={buttonColor} />
          </View>

          <ScrollView contentContainerStyle={styles.gridContainer}>
            {Array.from({ length: getDaysInMonth(currentDate) }, (_, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.gridItem, { backgroundColor: cardColor }]}
                onPress={() => {
                  setCurrentDate(new Date(getYear(currentDate), getMonth(currentDate), i + 1));
                  setViewMode('day');
                }}
              >
                <Text style={{ color: textColor }}>{i + 1}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* YEAR VIEW */}
      {viewMode === 'year' && (
        <View style={{ flex: 1 }}>
          <Text style={[styles.viewTitle, { color: textColor, textAlign: 'center' }]}>
            {getYear(currentDate)}
          </Text>

          <View style={styles.navRow}>
            <Button title="Prev" onPress={() => setCurrentDate(subYears(currentDate, 1))} color={buttonColor} />
            <Button title="Next" onPress={() => setCurrentDate(addYears(currentDate, 1))} color={buttonColor} />
          </View>

          <ScrollView contentContainerStyle={styles.gridContainer}>
            {Array.from({ length: 12 }, (_, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.gridItem, { backgroundColor: cardColor }]}
                onPress={() => {
                  setCurrentDate(new Date(getYear(currentDate), i, 1));
                  setViewMode('month');
                }}
              >
                <Text style={{ color: textColor }}>{format(new Date(2023, i, 1), 'MMM')}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      <Button title="Back to Home" onPress={() => router.back()} color={buttonColor} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  modeSwitch: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  content: { flex: 1 },
  viewTitle: { fontSize: 20, marginBottom: 10 },
  navRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 15 },
  eventCard: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  addContainer: { marginTop: 20 },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  gridItem: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 2,
  },
});
