import { Currency } from "../types";

export const popularCurrencies: Currency[] = [
  { code: "USD", symbol: "$", flag: "🇺🇸" },
  { code: "EUR", symbol: "€", flag: "🇪🇺" },
  { code: "GBP", symbol: "£", flag: "🇬🇧" },
  { code: "SAR", symbol: "﷼", flag: "🇸🇦" },
  { code: "INR", symbol: "₹", flag: "🇮🇳" },
  { code: "JPY", symbol: "¥", flag: "🇯🇵" },
  { code: "AUD", symbol: "A$", flag: "🇦🇺" },
  { code: "CAD", symbol: "C$", flag: "🇨🇦" },
  { code: "CHF", symbol: "CHF", flag: "🇨🇭" },
  { code: "SGD", symbol: "S$", flag: "🇸🇬" },
  { code: "AED", symbol: "د.إ", flag: "🇦🇪" },
  { code: "THB", symbol: "฿", flag: "🇹🇭" },
  { code: "MYR", symbol: "RM", flag: "🇲🇾" },
  { code: "IDR", symbol: "Rp", flag: "🇮🇩" },
  { code: "VND", symbol: "₫", flag: "🇻🇳" },
];

export const getExchangeRate = (
  fromCurrency: string,
  toCurrency: string,
): number => {
  if (fromCurrency === toCurrency) return 1;

  // Hardcoded INR-based exchange rates
  const ratesToINR: Record<string, number> = {
    USD: 83.25,
    EUR: 89.75,
    GBP: 104.1,
    SAR: 22.2,
    JPY: 0.56,
    AUD: 55.6,
    CAD: 61.3,
    CHF: 93.45,
    SGD: 61.9,
    AED: 22.65,
    THB: 2.31,
    MYR: 17.75,
    IDR: 0.0052,
    VND: 0.0033,
  };

  const INRToRates: Record<string, number> = Object.fromEntries(
    Object.entries(ratesToINR).map(([code, rate]) => [code, 1 / rate]),
  );

  if (toCurrency === "INR" && ratesToINR[fromCurrency]) {
    return ratesToINR[fromCurrency];
  }

  if (fromCurrency === "INR" && INRToRates[toCurrency]) {
    return INRToRates[toCurrency];
  }

  return 1; // default fallback
};
