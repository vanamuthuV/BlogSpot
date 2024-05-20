/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        blinker: "blinker 1s linear infinite",
      },
      keyframes: {
        blinker: {
          "50%": { opacity: "0" },
        },
      },
    },
    fontFamily: {
      sans: ["ui-sans-serif", "system-ui"],
      Mono: ["Space Mono", "Fira Code"],
    },
  },
  plugins: [],
};

