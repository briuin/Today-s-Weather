"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <button
        className="p-2 mt-4 bg-primary text-red rounded"
        onClick={toggleTheme}
      >
        Toggle Theme
      </button>
      <div className="p-4">
        <h1 className="text-2xl">Theme Switcher</h1>
        <p>Current theme: {theme}</p>
      </div>
    </>
  );
};
