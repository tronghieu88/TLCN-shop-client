/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-100": "#dbeafe",
        "primary-200": "#bfdbfe",
        "primary-300": "#93c5fd",
        "primary-400": "#60a5fa",
        "primary-500": "#3b82f6",
        "primary-600": "#0a68ff",
        "primary-700": "#1d4ed8",
        "primary-800": "#1e40af",
        "primary-900": "#1e3a8a",
        overplay: "rgba(0,0,0,0.9)",
        pending: "#f0ad4e",
        confirm: "#5cb85c",
        cancel: "#292b2c",
        Shipped: "#0275d8",
      },
    },
  },
  plugins: [],
};
