import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/theme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background-color)",
        text: "var(--text-color)",
        primary: "var(--primary-color)",
        "history-action": "var(--history-action-color)",
        "history-action-background": "var(--history-action-background-color)",
        "history-background": "var(--history-background)",
        "history-weather-background": "var(--history-weather-background)",
        "weather-details": "var(--weather-details-color)",
        "weather-details-background": "var(--weather-details-background)",
      },
    },
    screens: {
      desktop: "700px",
    },
  },
  plugins: [nextui()],
};
export default config;
