"use client";
import { Weather } from "./interfaces/weather";
import CIcon from "@coreui/icons-react";
import { cilSearch, cilTrash } from "@coreui/icons";
import useDateFormatter from "../hooks/useDateFormatter";

interface HistoryWeatherProp {
  weather: Weather;
  fetchWeather: Function;
  removeWeatherHistory: Function;
}

export const HistoryWeather = ({
  weather,
  fetchWeather,
  removeWeatherHistory,
}: HistoryWeatherProp) => {
  const { formatDate } = useDateFormatter();

  return (
    <div
      className="h-[60px] rounded-2xl bg-history-weather-background flex justify-between gap-2 items-center w-full px-[10px]"
      key={weather.id}
    >
      <div className="flex flex-col items-start desktop:flex-row desktop:items-center desktop:justify-between flex-1">
        <div className="flex">
          {weather.name}, {weather.sys.country}
        </div>
        <div>
          {formatDate(
            new Date(Date.now() + weather.timezone),
            "DD-MM-YYYY HH:mmA"
          )}
        </div>
      </div>
      <div className="flex gap-2 text-history-action-color">
        <HistoryActionButton
          icon={cilSearch}
          action={() => fetchWeather(weather.name, weather.sys.country)}
        ></HistoryActionButton>

        <HistoryActionButton
          icon={cilTrash}
          action={() => removeWeatherHistory(weather.timestamp)}
        ></HistoryActionButton>
      </div>
    </div>
  );
};

const HistoryActionButton = ({
  icon,
  action,
}: {
  icon: string[];
  action: Function;
}) => {
  return (
    <div
      className="w-[34px] h-[34px] relative cursor-pointer"
      onClick={() => action()}
    >
      <div className="w-[34px] h-[34px] left-0 top-0 absolute bg-history-action-background-color rounded-full shadow border-[1px] border-solid border-[var(--history-action-border-color)]" />
      <CIcon className="w-4 h-4 left-[9px] top-[9px] absolute " icon={icon} />
    </div>
  );
};
