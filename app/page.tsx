"use client";
import { useState } from "react";
import { Weather } from "./interfaces/weather";
import { History } from "./history";
import useCountryCodeLookup from "@/hooks/useCountryCodeLookup";
import useAxios from "@/hooks/useAxios";
import { WeatherMain } from "./weather-main";
import { Header } from "./header";

export default function Home() {
  const [data, setData] = useState<Weather | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<Weather[]>([]);
  const { lookup } = useCountryCodeLookup();
  const { request } = useAxios();

  const fetchWeather = async (city: string, country: string) => {
    const query = {
      city: city,
      country: lookup(country),
      apiKey: process.env.NEXT_PUBLIC_API_KEY,
    };
    if (!query.city || !query.country) {
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await request<Weather>({
        url: `https://api.openweathermap.org/data/2.5/weather?q=${query.city},${query.country}&appid=${query.apiKey}`,
      });
      const weather = {
        ...response.data,
        timestamp: Date.now(),
      };
      setData(weather);
      setHistory([...history, weather]);
    } catch (error) {
      setError("An error occurred while fetching data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const removeHistory = (timestamp: number) => {
    setHistory(history.filter((x) => x.timestamp !== timestamp));
  };

  return (
    <div className="min-h-screen flex flex-col text-text transition-colors duration-300 max-w-[700px] ml-auto mr-auto">
      <Header></Header>

      <WeatherMain
        fetchWeather={fetchWeather}
        error={error!}
        data={data!}
      ></WeatherMain>

      <History
        weathers={history}
        fetchWeather={fetchWeather}
        removeWeatherHistory={removeHistory}
      ></History>
    </div>
  );
}
