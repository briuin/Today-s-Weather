"use client";
import { Weather } from "./interfaces/weather";
import { WeatherFilter } from "./weather-filter";
import { WeatherDetails } from "./weather-details";

export const WeatherMain = ({
  fetchWeather,
  error,
  data,
}: {
  fetchWeather: Function;
  error: string;
  data: Weather;
}) => {
  return (
    <div className="flex flex-col">
      <WeatherFilter fetchWeather={fetchWeather}></WeatherFilter>
      <WeatherDetails error={error} data={data}></WeatherDetails>
    </div>
  );
};
