"use client";
import { WeatherFilter } from "./weather-filter";
import { WeatherDetails } from "./weather-details";

export const WeatherMain = () => {
  return (
    <div className="flex flex-col">
      <WeatherFilter></WeatherFilter>
      <WeatherDetails></WeatherDetails>
    </div>
  );
};
