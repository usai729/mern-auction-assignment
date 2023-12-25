/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        logo: [
          "Lora",
          "Noto Emoji",
          "Old Standard TT",
          "Roboto Mono",
          "serif",
          "sans-serif",
          "serif",
          "monospace",
        ],
      },
      borderWidth: {
        0: "none",
        1: "1px",
        3: "3px",
      },
      colors: {
        color1: "#0E0F19",
        color2: "#F9F5FF",
      },
    },
  },
  plugins: [],
};
