import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background-color)',
        text: 'var(--text-color)',
        primary: 'var(--primary-color)',
        'history-action-color': 'var(--history-action-color)',
        'history-action-background-color': 'var(--history-action-background-color)',
        'history-background': 'var(--history-background)',
        'history-weather-background': 'var(--history-weather-background)',
      },
      backgroundColor: {
        light: {
          background: '#ffffff',
        },
        dark: {
          background: '#121212',
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    screens: {
      'desktop': '700px',
    }
  },
  plugins: [],
};
export default config;
