"use client";
import axios from "@/utils/axios";
import { useRef, useState } from "react";
import { ThemeSwitcher } from "./theme-switcher";
interface Weather {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
  timestamp: number;
}

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
    <div className="flex flex-col bg-background text-text transition-colors duration-300">
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

      {/* history */}
      <div className="w-full">
        <div className="border-b-solid border-b-[1px] w-full border-b-black">
          <h1>Search History</h1>
        </div>
        {
          !history.length ? 
          <div className="w-full min-h-[300px] flex justify-center items-center">
          No Record
        </div>
        : 
        <div>
          {history.map((x, i) => (
            <div className="flex justify-between w-full" key={x.id}>
              <div className="flex">{i + 1}. {x.name}, {x.sys.country} </div>
              <div className="flex gap-2">
                <div>{new Date(Date.now() + x.timezone).toDateString()}</div>
                <div className="flex gap-2">
                  <button onClick={() => fetchWeather(x.name, x.sys.country)}>search</button>
                  <button onClick={() => removeHistory(x.timestamp)}>delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        }
        
      </div>
    </div>
  );
}
