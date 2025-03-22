import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useCanister } from '../hooks/useCanister';
import { autumnTheme } from '../styles/theme';

const Events: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const { call } = useCanister('event');
  const [events, setEvents] = useState<any[]>([]);
  const theme = darkMode ? autumnTheme.dark : autumnTheme.light;

  useEffect(() => {
    call('getEvents', []).then(setEvents);
  }, [call]);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Community Events</Text>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: theme.background, borderColor: theme.accent1 }]}>
            <Text style={{ color: theme.text }}>{item.title}</Text>
            <Text style={{ color: theme.accent2 }}>
              {new Date(Number(item.time) / 1000000).toLocaleString()}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  card: { padding: 16, borderWidth: 1, borderRadius: 8, marginBottom: 8 },
});

export default Events;