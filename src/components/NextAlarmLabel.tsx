import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface Props {
  nextAlarmAt: Date | null;
}

export function NextAlarmLabel({ nextAlarmAt }: Props) {
  if (!nextAlarmAt) return null;

  const h = nextAlarmAt.getHours();
  const m = nextAlarmAt.getMinutes().toString().padStart(2, '0');

  return (
    <Text style={styles.text}>다음 알림: {h}:{m}</Text>
  );
}

const styles = StyleSheet.create({
  text: { fontSize: 15, color: '#9E7B70', marginTop: 16 },
});
