"use client";
import useDateFormatter from "@/hooks/useDateFormatter";
import { Weather } from "./interfaces/weather";
import Image from "next/image";

export const WeatherDetails = ({
  error,
  data,
}: {
  error: string;
  data: Weather;
}) => {
  const { formatDate } = useDateFormatter();
  return (
    <div className="rounded-[20px] p-[20px] bg-white bg-opacity-20">
      {error || !data ? (
        <div className="border-red border-solid border-[1px] bg-red-400">
          Not found
        </div>
      ) : (
        <div className="flex flex-col relative">
          <div className="text-xl desktop:text-2xl">
            {data.weather[0].description}
          </div>
          <div className="text-[48px]">{data.main.temp}°</div>
          <div className="absolute top-[-50%] desktop:top-[-90%] right-0 w-[157px] h-[157px] desktop:w-[271px] desktop:h-[271px]">
            <Image
              alt="Today's weather"
              fill
              src={`/images/${data.weather[0].main.toLowerCase()}.png`}
            />
          </div>
          <div className="flex justify-between items-end text-sm desktop:text-base text-weather-details">
            <div className="flex flex-col">
              <div className="flex gap-1">
                <div>H: {data.main.temp_max}°</div>
                <div>L: {data.main.temp_min}°</div>
              </div>
              <strong>
                {data.name}, {data.sys.country}
              </strong>
            </div>
            <div className="flex flex-col items-end desktop:flex-row desktop:justify-between desktop:flex-1">
              <div>{data.weather[0].main}</div>
              <div>Humidity: {data.main.humidity}</div>
              <div>{formatDate(new Date(data.timestamp + data.timezone))}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
