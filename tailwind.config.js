/* eslint-env node */
const plugin = require("tailwindcss/plugin");
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "weather-primary": "#000",
        "weather-secondary": "#ffdc00",
        "footer-color": "rgba(255, 255, 255, 0.7)",
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
    plugin(({ addBase, addUtilities }) => {
      addBase({
        ".scrollbar": {
          overflowY: "auto",
          scrollbarColor: "#ffdc00",
          scrollbarWidth: "thin",
        },
        ".scrollbar::-webkit-scrollbar": {
          height: "4px",
          width: "2px",
        },
        ".scrollbar::-webkit-scrollbar-thumb": {
          backgroundColor: "#ffdc00",
        },
        ".scrollbar::-webkit-scrollbar-track-piece": {
          backgroundColor: "white",
        },
      });
      addUtilities({
        ".inset-center": {
          bottom: "2%",
          left: "50%",
          "@apply -translate-x-1/2 -translate-y-1/2": {},
        },
        ".inset-y-center": {
          top: "50%",
          "@apply -translate-y-1/2": {},
        },
        ".inset-x-center": {
          left: "50%",
          "@apply translate-x-1/2": {},
        },
      });
    }),
  ],
};
