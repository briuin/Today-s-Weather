import { Weather } from '@/app/interfaces/weather';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface HistoryContextProps {
  historyWeathers: Weather[];
  setHistoryWeathers: (weathers: Weather[]) => void;
  removeHistoryWeather: (id: number | string) => void;
}

const HistoryContext = createContext<HistoryContextProps | undefined>(undefined);

export const HistoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [historyWeathers, setHistoryWeathers] = useState<Weather[]>([]);

  const removeHistoryWeather = (id: number | string) => {
    setHistoryWeathers(historyWeathers.filter((weather) => weather.timestamp !== id));
  };

  return (
    <HistoryContext.Provider value={{ historyWeathers, setHistoryWeathers, removeHistoryWeather}}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistoryContext = () => {
  const context = useContext(HistoryContext);
  if (context === undefined) {
    throw new Error('useGlobalState must be used within a HistoryProvider');
  }
  return context;
};
