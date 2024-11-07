import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,ts,tsx}",

    // next ui
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,tsx,jsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: ["class"],
  plugins: [nextui()],
};
