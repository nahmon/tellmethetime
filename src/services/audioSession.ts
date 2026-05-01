import { Audio, InterruptionModeIOS, InterruptionModeAndroid } from 'expo-av';

let silentSound: Audio.Sound | null = null;

export async function startAudioSession(): Promise<void> {
  await Audio.setAudioModeAsync({
    staysActiveInBackground: true,
    playsInSilentModeIOS: true,
    allowsRecordingIOS: false,
    interruptionModeIOS: InterruptionModeIOS.MixWithOthers,
    interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
    shouldDuckAndroid: false,
  });

  const { sound } = await Audio.Sound.createAsync(
    require('../../assets/silent.mp3'),
    { isLooping: true, volume: 0, shouldPlay: true }
  );
  silentSound = sound;
}

export async function stopAudioSession(): Promise<void> {
  if (silentSound) {
    await silentSound.stopAsync();
    await silentSound.unloadAsync();
    silentSound = null;
  }
  await Audio.setAudioModeAsync({
    staysActiveInBackground: false,
  });
}
