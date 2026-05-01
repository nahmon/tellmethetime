import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { INTERVALS, IntervalMinutes } from '../constants';

interface Props {
  value: IntervalMinutes;
  onChange: (v: IntervalMinutes) => void;
  disabled: boolean;
}

export function IntervalSelector({ value, onChange, disabled }: Props) {
  return (
    <View style={styles.row}>
      {INTERVALS.map((min) => (
        <TouchableOpacity
          key={min}
          style={[styles.pill, value === min && styles.pillActive]}
          onPress={() => !disabled && onChange(min)}
          disabled={disabled}
        >
          <Text style={[styles.pillText, value === min && styles.pillTextActive]}>
            {min}분
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 12 },
  pill: {
    paddingHorizontal: 28,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: '#D9BFB7',
    backgroundColor: '#FFF',
  },
  pillActive: { backgroundColor: '#C49A8A', borderColor: '#C49A8A' },
  pillText: { fontSize: 16, color: '#9E7B70', fontWeight: '500' },
  pillTextActive: { color: '#FFF' },
});
