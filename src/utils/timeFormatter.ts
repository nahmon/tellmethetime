export function formatKoreanTime(date: Date): string {
  const hours24 = date.getHours();
  const hours = hours24 % 12;
  const minutes = date.getMinutes();
  return `${hours}시 ${minutes}분`;
}

export function buildAnnouncement(intervalMinutes: number, now: Date): string {
  return `${intervalMinutes}분이 지났습니다. 지금은 ${formatKoreanTime(now)}입니다.`;
}
