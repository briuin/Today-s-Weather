"use client";
import { WeatherMain } from "./weather-main";
import { Header } from "./header";
import { WeatherProvider } from "@/context/weather-context";
import { HistoryProvider } from "@/context/history-context";

export default function Home() {
  return (
    <WeatherProvider>
      <HistoryProvider>
        <div className="min-h-screen px-[15px] desktop:p-0 flex flex-col text-text transition-colors duration-300 max-w-[700px] desktop:ml-auto desktop:mr-auto">
          <Header></Header>

          <WeatherMain></WeatherMain>

        </div>
      </HistoryProvider>
    </WeatherProvider>
  );
}
