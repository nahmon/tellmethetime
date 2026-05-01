import { renderHook, act } from '@testing-library/react-native';
import { useTimer } from '../src/hooks/useTimer';

jest.mock('../src/services/audioSession', () => ({
  startAudioSession: jest.fn().mockResolvedValue(undefined),
  stopAudioSession: jest.fn().mockResolvedValue(undefined),
}));

jest.mock('../src/services/tts', () => ({
  speak: jest.fn().mockResolvedValue(undefined),
}));

describe('useTimer', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('초기 상태: 비활성, 10분 인터벌', () => {
    const { result } = renderHook(() => useTimer());
    expect(result.current.isActive).toBe(false);
    expect(result.current.intervalMinutes).toBe(10);
    expect(result.current.nextAlarmAt).toBeNull();
  });

  it('start 호출 시 isActive가 true가 된다', async () => {
    const { result } = renderHook(() => useTimer());
    await act(async () => {
      await result.current.start();
    });
    expect(result.current.isActive).toBe(true);
  });

  it('start 후 intervalMinutes 경과 시 speak가 호출된다', async () => {
    const { speak } = require('../src/services/tts');
    const { result } = renderHook(() => useTimer());

    await act(async () => {
      await result.current.start();
    });

    act(() => {
      jest.advanceTimersByTime(10 * 60 * 1000);
    });

    expect(speak).toHaveBeenCalledTimes(1);
    expect(speak).toHaveBeenCalledWith(
      expect.stringContaining('10분이 지났습니다')
    );
  });

  it('stop 호출 시 isActive가 false가 된다', async () => {
    const { result } = renderHook(() => useTimer());
    await act(async () => { await result.current.start(); });
    await act(async () => { await result.current.stop(); });
    expect(result.current.isActive).toBe(false);
    expect(result.current.nextAlarmAt).toBeNull();
  });

  it('setIntervalMinutes를 변경하면 intervalMinutes가 업데이트된다', () => {
    const { result } = renderHook(() => useTimer());
    act(() => { result.current.setIntervalMinutes(5); });
    expect(result.current.intervalMinutes).toBe(5);
  });
});
