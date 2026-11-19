export const VOLUME_BANDS = [
  { max: 20000, preset: 10000, label: 'Up to 20,000', silver: 8, gold: 12, platinum: 25 },
  { max: 100000, preset: 60000, label: '20,001–1,00,000', silver: 7, gold: 10.5, platinum: 21.5 },
  { max: 300000, preset: 200000, label: '1,00,001–3,00,000', silver: 6, gold: 9, platinum: 18.5 },
  { max: 1000000, preset: 500000, label: '3,00,001–10,00,000', silver: 5.5, gold: 8, platinum: 16.5 },
  { max: Infinity, preset: 1100000, label: 'Above 10,00,000', silver: 5, gold: 7, platinum: 15 },
];
export const volumeBandFor = minutes => VOLUME_BANDS.find(band => minutes <= band.max);
export const billableSeconds = seconds => seconds > 0 ? Math.max(30, Math.ceil(seconds / 6) * 6) : 0;
