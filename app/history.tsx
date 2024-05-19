import { HistoryWeather } from "./history-weather";
import { Weather } from "./interfaces/weather";

interface HistoryProp {
  weathers: Weather[];
  fetchWeather: Function;
  removeWeatherHistory: Function;
}

export const History = ({
  weathers,
  fetchWeather,
  removeWeatherHistory,
}: HistoryProp) => {
  return (
    <div className="bg-history-background rounded-3xl mx-[15px] desktop:mx-0  text-sm desktop:text-base">
      <div className="w-full m-[20px]">
        <span>Search History</span>
      </div>
      {!weathers.length ? (
        <EmptyData />
      ) : (
        <WeatherList
          weathers={weathers}
          removeWeatherHistory={removeWeatherHistory}
          fetchWeather={fetchWeather}
        ></WeatherList>
      )}
    </div>
  );
};

const EmptyData = () => {
  return (
    <div className="w-full min-h-[300px] flex justify-center items-center">
      No Record
    </div>
  );
};

const WeatherList = ({
  weathers,
  removeWeatherHistory,
  fetchWeather,
}: {
  weathers: Weather[];
  removeWeatherHistory: Function;
  fetchWeather: Function;
}) => {
  return (
    <div className="flex flex-col gap-[18px] ml-[17px] mr-[13px] pb-[100px]">
      {weathers.map((weather) => (
        <HistoryWeather
          key={weather.timestamp}
          removeWeatherHistory={removeWeatherHistory}
          weather={weather}
          fetchWeather={fetchWeather}
        ></HistoryWeather>
      ))}
    </div>
  );
};
