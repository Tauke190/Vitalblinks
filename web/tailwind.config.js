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
  plugins: [
    nextui({
      layout: {
        disabledOpacity: "0.2",
        radius: {
          small: "2px",
          medium: "6px",
          large: "6px",
        },
      },
      prefix: "vitalUI",
      defaultTheme: "dark",
      themes: {
        light: {
          primary: "#247EE5",
        },
        dark: {
          primary: "#247EE5",
        },
      },
    }),
    require("tailwindcss-animate"),
  ],
};
