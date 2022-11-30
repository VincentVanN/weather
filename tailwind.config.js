/* eslint-env node */
const plugin = require("tailwindcss/plugin");
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "weather-primary": "#00668A",
        "weather-secondary": "#004E71",
      },
    },
    fontFamily: {
      Roboto: ["Roboto, sans-serif"],
    },
    container: {
      padding: "2rem",
      center: true,
    },
    screens: {
      sm: "640px",
      md: "768px",
    },
  },
  plugins: [
    plugin(({ addBase }) => {
      addBase({
        ".scrollbar": {
          overflowY: "auto",
          scrollbarColor: "#00668A",
          scrollbarWidth: "thin",
        },
        ".scrollbar::-webkit-scrollbar": {
          height: "4px",
          width: "2px",
        },
        ".scrollbar::-webkit-scrollbar-thumb": {
          backgroundColor: "#004E71",
        },
        ".scrollbar::-webkit-scrollbar-track-piece": {
          backgroundColor: "white",
        },
      });
    }),
  ],
};
