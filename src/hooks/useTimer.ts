import { useState, useRef, useCallback } from 'react';
import { startAudioSession, stopAudioSession } from '../services/audioSession';
import { speak } from '../services/tts';
import { buildAnnouncement } from '../utils/timeFormatter';

export function useTimer() {
  const [isActive, setIsActive] = useState(false);
  const [intervalMinutes, setIntervalMinutes] = useState(10);
  const [nextAlarmAt, setNextAlarmAt] = useState<Date | null>(null);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const intervalRef = useRef(intervalMinutes);
  intervalRef.current = intervalMinutes;

  const start = useCallback(async () => {
    if (timerRef.current) return;  // already running — guard against double-tap
    await startAudioSession();
    setIsActive(true);

    const ms = intervalRef.current * 60 * 1000;
    setNextAlarmAt(new Date(Date.now() + ms));

    timerRef.current = setInterval(async () => {
      const now = new Date();
      const text = buildAnnouncement(intervalRef.current, now);
      await speak(text);
      setNextAlarmAt(new Date(Date.now() + intervalRef.current * 60 * 1000));
    }, ms);
  }, []);

  const stop = useCallback(async () => {
    if (!timerRef.current) return;  // already stopped
    clearInterval(timerRef.current);
    timerRef.current = null;
    await stopAudioSession();
    setIsActive(false);
    setNextAlarmAt(null);
  }, []);

  const toggle = useCallback(async () => {
    if (isActive) {
      await stop();
    } else {
      await start();
    }
  }, [isActive, start, stop]);

  return { isActive, intervalMinutes, nextAlarmAt, setIntervalMinutes, start, stop, toggle };
}
