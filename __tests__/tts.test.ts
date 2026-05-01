import { speak } from '../src/services/tts';
import * as Speech from 'expo-speech';
import { buildAnnouncement } from '../src/utils/timeFormatter';

jest.mock('expo-speech', () => ({
  speak: jest.fn(),
  stop: jest.fn(),
}));

describe('speak', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('한국어로 멘트를 발화한다', async () => {
    const date = new Date('2026-04-30T15:40:00');
    const text = buildAnnouncement(10, date);

    await speak(text);

    expect(Speech.speak).toHaveBeenCalledWith(text, {
      language: 'ko-KR',
      rate: 0.9,
    });
  });

  it('이전 발화를 중단하고 새 발화를 시작한다', async () => {
    await speak('첫 번째');
    await speak('두 번째');

    expect(Speech.stop).toHaveBeenCalledTimes(2);
    expect(Speech.speak).toHaveBeenCalledTimes(2);
  });
});
