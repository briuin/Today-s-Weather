import { useHistoryContext } from "@/context/history-context";
import { HistoryWeather } from "./history-weather";
import { useWeatherContext } from "@/context/weather-context";
import { useEffect } from "react";

export const History = () => {
  const { historyWeathers, setHistoryWeathers } = useHistoryContext();
  const { weather } = useWeatherContext();

  useEffect(() => {
    if (weather) {
      setHistoryWeathers([...historyWeathers, weather]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weather]);

  return (
    <div className="bg-history-background rounded-3xl text-sm desktop:text-base">
      <div className="w-full m-[20px]">
        <span>Search History</span>
      </div>
      {!historyWeathers.length ? <EmptyData /> : <WeatherList></WeatherList>}
    </div>
  );
};

const EmptyData = () => {
  return (
    <div className="w-full min-h-[120px] desktop:min-h-[300px] flex justify-center items-center text-zinc-600 text-xs desktop:text-base">
      No Record
    </div>
  );
};

const WeatherList = () => {
  const { historyWeathers, removeHistoryWeather } = useHistoryContext();

  const { fetchWeather } = useWeatherContext();

  return (
    <div className="flex flex-col gap-[18px] ml-[17px] mr-[13px] pb-[100px] text-xs desktop:text-base">
      {historyWeathers.map((weather) => (
        <HistoryWeather
          key={weather.timestamp}
          removeWeatherHistory={removeHistoryWeather}
          weather={weather}
          fetchWeather={fetchWeather}
        ></HistoryWeather>
      ))}
    </div>
  );
};
