/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    ontFamily: {
      'sans': ['ui-sans-serif', 'system-ui'],
      'fira' : ['Fira Code'],
    }
  },
  plugins: [],
};

