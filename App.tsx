import React, { useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, StatusBar
} from 'react-native';
import mobileAds, {
  InterstitialAd, AdEventType
} from 'react-native-google-mobile-ads';
import { useTimer } from './src/hooks/useTimer';
import { IntervalSelector } from './src/components/IntervalSelector';
import { TimerButton } from './src/components/TimerButton';
import { NextAlarmLabel } from './src/components/NextAlarmLabel';
import { AdBanner } from './src/components/AdBanner';
import { AD_UNITS, INTERSTITIAL_SHOW_EVERY_N_LAUNCHES, IntervalMinutes } from './src/constants';

const interstitial = InterstitialAd.createForAdRequest(AD_UNITS.INTERSTITIAL, {
  requestNonPersonalizedAdsOnly: true,
});

export default function App() {
  const { isActive, intervalMinutes, nextAlarmAt, setIntervalMinutes, toggle } = useTimer();
  const launchCountRef = useRef(0);

  useEffect(() => {
    mobileAds().initialize();

    const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      launchCountRef.current += 1;
      if (launchCountRef.current % INTERSTITIAL_SHOW_EVERY_N_LAUNCHES === 0) {
        interstitial.show();
      }
    });
    interstitial.load();

    return unsubscribe;
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Text style={styles.title}>시간아알려줘</Text>

        <IntervalSelector
          value={intervalMinutes as IntervalMinutes}
          onChange={setIntervalMinutes}
          disabled={isActive}
        />

        <View style={styles.buttonArea}>
          <TimerButton isActive={isActive} onPress={toggle} />
          <NextAlarmLabel nextAlarmAt={nextAlarmAt} />
        </View>
      </View>

      <AdBanner />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FDF8F6' },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 24,
    paddingBottom: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#7A4F43',
    letterSpacing: 0.5,
  },
  buttonArea: { alignItems: 'center' },
});
