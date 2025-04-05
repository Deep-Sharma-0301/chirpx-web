/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // 👈 switch from 'media' or false to 'class'
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
