import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bazar: {
          green: "#174d3c",
          deep: "#103a2d",
          lime: "#d9ed83",
          cream: "#f7f8f2",
          ink: "#18231e",
        },
      },
      fontFamily: {
        bangla: ["Noto Sans Bengali", "Hind Siliguri", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
