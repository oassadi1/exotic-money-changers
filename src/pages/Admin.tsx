import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

type CurrencyRate = {
  id: number;
  currency_code: string;
  rate: number;
  updated_at: string | null;
};

const Admin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [rates, setRates] = useState<CurrencyRate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        setIsLoggedIn(true);
        fetchRates();
      }
    };

    checkSession();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('Signing in...');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage('Login failed. Please check the email and password.');
      return;
    }

    setMessage('');
    setIsLoggedIn(true);
    fetchRates();
  };

  const fetchRates = async () => {
    setIsLoading(true);

    const { data, error } = await supabase
      .from('currency_rates')
      .select('id, currency_code, rate, updated_at')
      .order('currency_code');

    if (error) {
      setMessage('Could not load currency rates.');
      setIsLoading(false);
      return;
    }

    const loadedRates = data || [];

    setRates(loadedRates);

    const timestamps = loadedRates
      .map((item) => item.updated_at)
      .filter((timestamp): timestamp is string => Boolean(timestamp));

    if (timestamps.length > 0) {
      const latestTimestamp = timestamps.reduce((latest, current) =>
        new Date(current).getTime() > new Date(latest).getTime() ? current : latest
      );

      setLastUpdated(latestTimestamp);
    } else {
      setLastUpdated(null);
    }

    setIsLoading(false);
  };

  const handleRateChange = (id: number, value: string) => {
    setRates((currentRates) =>
      currentRates.map((item) => (item.id === id ? { ...item, rate: Number(value) } : item))
    );
  };

  const saveRates = async () => {
    setIsLoading(true);
    setMessage('Saving rates...');

    const updateTime = new Date().toISOString();

    for (const item of rates) {
      const { error } = await supabase
        .from('currency_rates')
        .update({
          rate: item.rate,
          updated_at: updateTime,
        })
        .eq('id', item.id);

      if (error) {
        setMessage(
          `Could not update ${item.currency_code}. No changes were made to the website code.`
        );
        setIsLoading(false);
        return;
      }
    }

    setMessage('Rates updated successfully.');

    await fetchRates();

    setIsLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    setRates([]);
    setEmail('');
    setPassword('');
    setMessage('');
    setLastUpdated(null);
  };

  const formatLastUpdated = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Exotic Money Changers</h1>

          <p className="text-gray-600 mb-6">Admin Rate Management</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="owner@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="Enter password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-teal-700 text-white rounded-lg py-2 font-semibold hover:bg-teal-800"
            >
              Login
            </button>
          </form>

          {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Currency Rate Management</h1>

            <p className="text-gray-600 mt-1">Update the INR selling rates below.</p>

            {lastUpdated && (
              <p className="text-sm text-gray-500 mt-2">
                Last Updated:{' '}
                <span className="font-medium text-gray-700">{formatLastUpdated(lastUpdated)}</span>
              </p>
            )}
          </div>

          <button
            onClick={handleLogout}
            className="border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50"
          >
            Logout
          </button>
        </div>

        {isLoading && rates.length === 0 ? (
          <p>Loading rates...</p>
        ) : (
          <div className="space-y-3">
            {rates.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border border-gray-200 rounded-lg p-4"
              >
                <div className="font-semibold text-gray-900">{item.currency_code}</div>

                <div className="flex items-center gap-2">
                  <span className="text-gray-500">₹</span>

                  <input
                    type="number"
                    step="any"
                    min="0"
                    value={item.rate}
                    onChange={(e) => handleRateChange(item.id, e.target.value)}
                    className="w-36 border border-gray-300 rounded-lg px-3 py-2 text-right"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={saveRates}
          disabled={isLoading}
          className="w-full mt-6 bg-teal-700 text-white rounded-lg py-3 font-semibold hover:bg-teal-800 disabled:opacity-50"
        >
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>

        {message && <p className="mt-4 text-center text-sm text-gray-700">{message}</p>}
      </div>
    </div>
  );
};

export default Admin;
