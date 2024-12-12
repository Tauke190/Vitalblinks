import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,ts,tsx}",

    // next ui
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,tsx,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
    },
  },
  darkMode: ["class"],
  plugins: [
    nextui({
      layout: {
        disabledOpacity: "0.5",
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
