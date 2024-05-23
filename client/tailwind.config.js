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
      inset: {
        "-38": "-9.5rem", // Assuming 1rem = 4 units in Tailwind (adjust accordingly)
      },
      fontSize: {
        xs: "0.75rem", // 12px (default example)
        "vs": "10px", // Adding custom font size 8px
      },
    },
    fontFamily: {
      sans: ["ui-sans-serif", "system-ui"],
      Mono: ["Space Mono", "Fira Code"],
    },
  },
  plugins: [],
};

