import * as Speech from 'expo-speech';

export async function speak(text: string): Promise<void> {
  Speech.stop();
  Speech.speak(text, {
    language: 'ko-KR',
    rate: 0.9,
  });
}
