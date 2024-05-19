"use client";
import { useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useWeatherContext } from "@/context/weather-context";

export const WeatherFilter = () => {
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const { error, fetchWeather, isLoading } = useWeatherContext();

  const clear = () => {
    setCity("");
    setCountry("");
  };

  return (
    <>
      <div className="flex gap-[20px] flex-col items-end desktop:flex-row desktop:items-center">
        <div className="flex w-full desktop:flex-1">
          <Input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            label="City"
            size="sm"
          />
        </div>

        <div className="flex w-full desktop:flex-1">
          <Input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            label="Country"
            size="sm"
          />
        </div>

        <div className="flex gap-2">
          <Button
            size="sm"
            color="secondary"
            onClick={() => fetchWeather(city, country)}
            isDisabled={city === "" || country === ""}
            isLoading={isLoading}
          >
            search
          </Button>
          <Button
            color="secondary"
            size="sm"
            onClick={() => clear()}
            isDisabled={!city && !country}
          >
            clear
          </Button>
        </div>
      </div>

      {error && (
        <div
          className="border border-red-500 bg-red-200 text-red-800 px-2 py-1 rounded mt-4 desktop:mt-2"
          role="alert"
        >
          <span className="block sm:inline">Not found.</span>
        </div>
      )}
    </>
  );
};
