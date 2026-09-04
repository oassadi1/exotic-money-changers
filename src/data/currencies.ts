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
   USD: 96.50,
    EUR: 111.80,
    GBP: 129.89,
    SAR: 26.76,
    JPY: 0.58,
    AUD: 55.01,
    CAD: 70.50,
    CHF: 118.80,
    SGD: 75.66,
    AED: 26.73,
    THB: 2.55,
    MYR: 19.89,
    IDR: 0.00515,
    VND: 0.00329,
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
