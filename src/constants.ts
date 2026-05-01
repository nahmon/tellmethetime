export const INTERVALS = [5, 10] as const;
export type IntervalMinutes = typeof INTERVALS[number];

export const AD_UNITS = {
  BANNER: __DEV__
    ? 'ca-app-pub-3940256099942544/2934735716'
    : 'ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY',
  INTERSTITIAL: __DEV__
    ? 'ca-app-pub-3940256099942544/4411468910'
    : 'ca-app-pub-XXXXXXXXXXXXXXXX/ZZZZZZZZZZ',
} as const;

export const INTERSTITIAL_SHOW_EVERY_N_LAUNCHES = 3;
