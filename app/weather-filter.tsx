"use client";
import { useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

export const WeatherFilter = ({ fetchWeather }: { fetchWeather: Function }) => {
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");

  const clear = () => {
    setCity("");
    setCountry("");
  };

  return (
    <>
      <div className="flex gap-[20px] flex-col items-end desktop:flex-row desktop:items-center desktop:mb-[100px]">
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
    </>
  );
};
