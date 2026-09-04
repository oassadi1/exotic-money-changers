import { Currency } from '../types';
import { supabase } from '../lib/supabase';

export const popularCurrencies: Currency[] = [
  { code: 'USD', symbol: '$', flag: '🇺🇸' },
  { code: 'EUR', symbol: '€', flag: '🇪🇺' },
  { code: 'GBP', symbol: '£', flag: '🇬🇧' },
  { code: 'SAR', symbol: '﷼', flag: '🇸🇦' },
  { code: 'INR', symbol: '₹', flag: '🇮🇳' },
  { code: 'JPY', symbol: '¥', flag: '🇯🇵' },
  { code: 'AUD', symbol: 'A$', flag: '🇦🇺' },
  { code: 'CAD', symbol: 'C$', flag: '🇨🇦' },
  { code: 'CHF', symbol: 'CHF', flag: '🇨🇭' },
  { code: 'SGD', symbol: 'S$', flag: '🇸🇬' },
  { code: 'AED', symbol: 'د.إ', flag: '🇦🇪' },
  { code: 'THB', symbol: '฿', flag: '🇹🇭' },
  { code: 'MYR', symbol: 'RM', flag: '🇲🇾' },
  { code: 'IDR', symbol: 'Rp', flag: '🇮🇩' },
  { code: 'VND', symbol: '₫', flag: '🇻🇳' },
];

// Emergency fallback rates.
// These are used if Supabase cannot be reached.
const fallbackRatesToINR: Record<string, number> = {
  USD: 96.5,
  EUR: 111.9,
  GBP: 129.9,
  SAR: 26.2,
  JPY: 0.8026,
  AUD: 70.01,
  CAD: 70.5,
  CHF: 118.88,
  SGD: 76.6,
  AED: 26.8,
  THB: 2.98,
  MYR: 24.45,
  IDR: 0.0059,
  VND: 0.0039,
};

let cachedRates: Record<string, number> | null = null;
let lastFetched = 0;

const CACHE_TIME = 30000;

export const getRatesToINR = async (): Promise<Record<string, number>> => {
  const now = Date.now();

  if (cachedRates && now - lastFetched < CACHE_TIME) {
    return cachedRates;
  }

  try {
    const { data, error } = await supabase.from('currency_rates').select('currency_code, rate');

    if (error) {
      throw error;
    }

    const databaseRates: Record<string, number> = {
      ...fallbackRatesToINR,
    };

    data?.forEach((item) => {
      const rate = Number(item.rate);

      if (item.currency_code && Number.isFinite(rate) && rate > 0) {
        databaseRates[item.currency_code] = rate;
      }
    });

    cachedRates = databaseRates;
    lastFetched = now;

    return databaseRates;
  } catch (error) {
    console.error('Could not load Supabase currency rates. Using fallback rates.', error);

    return fallbackRatesToINR;
  }
};

export const getExchangeRate = async (
  fromCurrency: string,
  toCurrency: string
): Promise<number> => {
  if (fromCurrency === toCurrency) {
    return 1;
  }

  const ratesToINR = await getRatesToINR();

  if (toCurrency === 'INR' && ratesToINR[fromCurrency]) {
    return ratesToINR[fromCurrency];
  }

  if (fromCurrency === 'INR' && ratesToINR[toCurrency]) {
    return 1 / ratesToINR[toCurrency];
  }

  if (ratesToINR[fromCurrency] && ratesToINR[toCurrency]) {
    return ratesToINR[fromCurrency] / ratesToINR[toCurrency];
  }

  return 1;
};
