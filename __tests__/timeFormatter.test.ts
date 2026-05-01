import { formatKoreanTime, buildAnnouncement } from '../src/utils/timeFormatter';

describe('formatKoreanTime', () => {
  it('오후 3시 40분을 한국어로 포맷한다', () => {
    const date = new Date('2026-04-30T15:40:00');
    expect(formatKoreanTime(date)).toBe('3시 40분');
  });

  it('자정(0시)을 처리한다', () => {
    const date = new Date('2026-04-30T00:05:00');
    expect(formatKoreanTime(date)).toBe('12시 5분');
  });

  it('정오(12시)를 처리한다', () => {
    const date = new Date('2026-04-30T12:30:00');
    expect(formatKoreanTime(date)).toBe('12시 30분');
  });

  it('정각(00분)을 처리한다', () => {
    const date = new Date('2026-04-30T14:00:00');
    expect(formatKoreanTime(date)).toBe('2시 0분');
  });
});

describe('buildAnnouncement', () => {
  it('10분 인터벌 멘트를 생성한다', () => {
    const date = new Date('2026-04-30T15:40:00');
    expect(buildAnnouncement(10, date)).toBe(
      '10분이 지났습니다. 지금은 3시 40분입니다.'
    );
  });

  it('5분 인터벌 멘트를 생성한다', () => {
    const date = new Date('2026-04-30T09:05:00');
    expect(buildAnnouncement(5, date)).toBe(
      '5분이 지났습니다. 지금은 9시 5분입니다.'
    );
  });
});
