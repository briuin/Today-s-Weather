"use client";
import axios from "@/utils/axios";
import { useRef, useState } from "react";
import { ThemeSwitcher } from "./theme-switcher";
import { Weather } from "./interfaces/weather";
import { History } from "./history";

export default function Home() {
  const [data, setData] = useState<Weather | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<Weather[]>([]);
  const cityInputRef = useRef<HTMLInputElement>(null);
  const countryInputRef = useRef<HTMLInputElement>(null);

  const fetchWeather = async (city?: string , country?: string) => {
    const query = {
      city: city || cityInputRef?.current?.value,
      country: country || countryInputRef?.current?.value,
      apiKey: process.env.NEXT_PUBLIC_API_KEY,
    }
    if (!query.city || !query.country) {
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<Weather>(
        `https://api.openweathermap.org/data/2.5/weather?q=${query.city},${query.country}&appid=${query.apiKey}`
      );
      const weather = {
        ...response.data,
        timestamp: Date.now()
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

  const clear = () => {
    if (cityInputRef.current) {
      cityInputRef.current.value = "";
    }

    if (countryInputRef.current) {
      countryInputRef.current.value = "";
    }
  };

  const removeHistory = (timestamp: number) => {
    setHistory(history.filter((x) => x.timestamp !== timestamp));
  }

  return (
    <div className="min-h-screen flex flex-col text-text transition-colors duration-300 max-w-[700px] ml-auto mr-auto">
      {/* page header */}
      <div className="border-b-solid border-b-[1px] w-full border-b-black">
        <h1>Today's Weather</h1>
      </div>
      <ThemeSwitcher></ThemeSwitcher>

      {/* filter area */}
      <div className="flex flex-col">
        <div className="flex gap-[20px]">
          <div className="flex">
            <div>City: </div>
            <input ref={cityInputRef} />
          </div>

          <div className="flex">
            <div>Country: </div>
            <input ref={countryInputRef} />
          </div>

          <div className="flex gap-2">
            <button onClick={() => fetchWeather()}>search</button>
            <button onClick={clear}>clear</button>
          </div>
        </div>

        {error || !data ? (
          <div className="border-red border-solid border-[1px] bg-red-400">
            Not found
          </div>
        ) : (
          <div className="flex flex-col">
            <div>
              {data.name}, {data.sys.country}
            </div>
            <div>{data.weather[0].main}</div>
            <div>Description: {data.weather[0].description}</div>
            <div>
              Tempetature: {data.main.temp_min} ~ {data.main.temp_max}
            </div>
            <div>Humidity: {data.main.humidity}</div>
            <div>
              Time: {new Date(Date.now() + data.timezone).toDateString()}
            </div>
          </div>
        )}
      </div>

      <History weathers={history} fetchWeather={fetchWeather} removeWeatherHistory={removeHistory}></History>
    </div>
  );
}
