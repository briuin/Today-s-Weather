"use client";
import { ThemeSwitcher } from "./theme-switcher";

export const Header = () => {
  return (
    <div className="flex justify-between h-[60px] desktop:h-[80px] items-center">
      <span className="text-[24px] desktop:text-[28px]">
        <strong>Today's Weather</strong>
      </span>
      <ThemeSwitcher></ThemeSwitcher>
    </div>
  );
};
