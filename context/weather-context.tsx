import { Weather } from '@/app/interfaces/weather';
import useAxios from '@/hooks/useAxios';
import useUrlEncoding from '@/hooks/useUrlEncoding';
import useCountryCodeLookup from '@/hooks/useCountryCodeLookup';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface WeatherContextProps {
  weather: Weather | null;
  setWeather: (value: Weather) => void;
  fetchWeather: (city: string, country: string) => void;
  error: string | null;
  setError: (value: string) => void;
  isLoading: boolean;
}

const WeatherContext = createContext<WeatherContextProps | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { lookup } = useCountryCodeLookup();
  const { request } = useAxios();
  const { encodeUrl } = useUrlEncoding();

  const fetchWeather = async (city: string, country: string) => {
    if (loading) {
        return;
    }

    const query = {
      city: city,
      country: lookup(country),
      apiKey: process.env.NEXT_PUBLIC_API_KEY,
      units: 'metric',
    };
    if (!query.city || !query.country) {
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await request<Weather>({
        url: `https://api.openweathermap.org/data/2.5/weather?q=${encodeUrl(query.city)},${encodeUrl(query.country)}&appid=${query.apiKey}&&units=${query.units}`,
      });
      const weather = {
        ...response.data,
        timestamp: Date.now(),
      };
      setWeather(weather);
    } catch (error) {
      setError("An error occurred while fetching data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <WeatherContext.Provider value={{ weather, setWeather, fetchWeather, error, setError, isLoading: loading }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeatherContext = () => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useGlobalState must be used within a WeatherProvider');
  }
  return context;
};
