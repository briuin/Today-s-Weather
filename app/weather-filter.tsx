"use client";
import { useRef } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

export const WeatherFilter = ({ fetchWeather }: { fetchWeather: Function }) => {
  const cityInputRef = useRef<HTMLInputElement>(null);
  const countryInputRef = useRef<HTMLInputElement>(null);

  const clear = () => {
    if (cityInputRef.current) {
      cityInputRef.current.value = "";
    }

    if (countryInputRef.current) {
      countryInputRef.current.value = "";
    }
  };

  return (
    <>
      <div className="flex gap-[20px] flex-col m-[15px] desktop:m-0 desktop:flex-row items-center desktop:mb-[100px]">
        <div className="flex desktop:flex-1">
          <Input ref={cityInputRef} label="City" />
        </div>

        <div className="flex desktop:flex-1">
          <Input ref={countryInputRef} label="Country" />
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() =>
              fetchWeather(
                cityInputRef?.current?.value,
                countryInputRef?.current?.value
              )
            }
          >
            search
          </Button>
          <Button onClick={() => clear()}>clear</Button>
        </div>
      </div>
    </>
  );
};
