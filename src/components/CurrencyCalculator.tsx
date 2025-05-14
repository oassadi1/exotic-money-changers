import React, { useState, useEffect } from "react";
import { ArrowRightLeft, RefreshCcw } from "lucide-react";
import { popularCurrencies, getExchangeRate } from "../data/currencies";
import { Currency } from "../types";

const CurrencyCalculator: React.FC = () => {
  const [amount, setAmount] = useState<number>(100);
  const [fromCurrency, setFromCurrency] = useState<Currency>(
    popularCurrencies.find((c) => c.code === "USD")!,
  );
  const [toCurrency, setToCurrency] = useState<Currency>(
    popularCurrencies.find((c) => c.code === "INR")!,
  );

  const [result, setResult] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [exchangeRate, setExchangeRate] = useState<number>(1);

  const calculateExchange = async () => {
    setIsLoading(true);

    const rate = await getExchangeRate(fromCurrency.code, toCurrency.code);
    setExchangeRate(rate); // Store the latest rate
    setResult(amount * rate);

    setIsLoading(false);
  };

  useEffect(() => {
    calculateExchange();
  }, [amount, fromCurrency, toCurrency]);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <section id="calculator" className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Currency Exchange Calculator
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
            Get the latest exchange rates and calculate your currency
            conversion.
          </p>
        </div>

        <div className="mt-12 max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-teal-700 p-4 sm:p-6 text-white">
              <h3 className="text-xl font-bold text-center">
                Calculate Your Exchange
              </h3>
            </div>

            <div className="p-4 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                {/* Amount Input */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="amount"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Amount
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">
                        {fromCurrency.symbol}
                      </span>
                    </div>
                    <input
                      type="number"
                      id="amount"
                      value={amount}
                      onChange={(e) =>
                        setAmount(parseFloat(e.target.value) || 0)
                      }
                      className="focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 pr-12 py-2 sm:text-sm border-gray-300 rounded-md"
                      placeholder="0.00"
                      min="0"
                    />
                  </div>
                </div>

                {/* From Currency */}
                <div>
                  <label
                    htmlFor="fromCurrency"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    From
                  </label>
                  <select
                    id="fromCurrency"
                    value={fromCurrency.code}
                    onChange={(e) =>
                      setFromCurrency(
                        popularCurrencies.find(
                          (c) => c.code === e.target.value,
                        ) || popularCurrencies[0],
                      )
                    }
                    className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  >
                    {popularCurrencies.map((currency) => (
                      <option key={currency.code} value={currency.code}>
                        {currency.flag} {currency.code}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Swap Button */}
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={swapCurrencies}
                    className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                  >
                    <ArrowRightLeft className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>

                {/* To Currency */}
                <div>
                  <label
                    htmlFor="toCurrency"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    To
                  </label>
                  <select
                    id="toCurrency"
                    value={toCurrency.code}
                    onChange={(e) =>
                      setToCurrency(
                        popularCurrencies.find(
                          (c) => c.code === e.target.value,
                        ) || popularCurrencies[1],
                      )
                    }
                    className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  >
                    {popularCurrencies.map((currency) => (
                      <option key={currency.code} value={currency.code}>
                        {currency.flag} {currency.code}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Result */}
              <div className="mt-8 bg-gray-50 rounded-lg p-4">
                <div className="text-center">
                  {isLoading ? (
                    <div className="flex justify-center items-center space-x-2">
                      <RefreshCcw className="h-5 w-5 text-teal-600 animate-spin" />
                      <span className="text-gray-600">Calculating...</span>
                    </div>
                  ) : (
                    <>
                      <p className="text-sm text-gray-500 mb-1">
                        {amount} {fromCurrency.code} equals
                      </p>
                      <div className="text-3xl font-bold text-teal-800">
                        {toCurrency.symbol} {result.toFixed(2)}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        1 {fromCurrency.code} = {exchangeRate.toFixed(4)}{" "}
                        {toCurrency.code}
                      </p>
                    </>
                  )}
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <a
                  href="#contact"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                >
                  Exchange Now
                </a>
              </div>
            </div>

            <div className="border-t border-gray-200 p-4 text-center text-sm text-gray-500">
              <div className="flex items-center justify-center space-x-1">
                <ShieldIcon className="h-4 w-4 text-teal-600" />
                <span>
                  Live market rates. No hidden fees. Secure transactions.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ShieldIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

export default CurrencyCalculator;
