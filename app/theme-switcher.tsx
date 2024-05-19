"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Switch } from "@nextui-org/switch";

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Switch
      defaultSelected
      size="lg"
      color="success"
      onValueChange={toggleTheme}
      startContent={<span>light</span>}
      endContent={<span>dark</span>}
    ></Switch>
  );
};
