"use client";
import useDateFormatter from "@/hooks/useDateFormatter";
import Image from "next/image";
import { useWeatherContext } from "@/context/weather-context";

export const WeatherDetails = () => {
  const { error, weather } = useWeatherContext();
  const { formatDate } = useDateFormatter();
  return (
    <div className="rounded-[20px] p-[20px] bg-weather-details-background">
      {error || !weather ? (
        <div className="border-red border-solid border-[1px] bg-red-400">
          Not found
        </div>
      ) : (
        <div className="flex flex-col relative">
          <div className="text-xl desktop:text-2xl">
            {weather.weather[0].description}
          </div>
          <div className="text-[48px]">{weather.main.temp}°</div>
          <div className="absolute top-[-50%] desktop:top-[-90%] right-0 w-[157px] h-[157px] desktop:w-[271px] desktop:h-[271px]">
            <Image
              alt="Today's weather"
              fill
              src={`/images/${weather.weather[0].main.toLowerCase()}.png`}
            />
          </div>
          <div className="flex justify-between items-end text-sm desktop:text-base text-weather-details">
            <div className="flex flex-col">
              <div className="flex gap-1">
                <div>H: {weather.main.temp_max}°</div>
                <div>L: {weather.main.temp_min}°</div>
              </div>
              <strong>
                {weather.name}, {weather.sys.country}
              </strong>
            </div>
            <div className="flex flex-col items-end desktop:flex-row desktop:justify-between desktop:flex-1">
              <div>{weather.weather[0].main}</div>
              <div>Humidity: {weather.main.humidity}</div>
              <div>
                {formatDate(new Date(weather.timestamp + weather.timezone))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
