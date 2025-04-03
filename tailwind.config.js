const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'], 
  darkMode: 'class', 
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4f46e5', 
          DEFAULT: '#322c7e', 
          dark: '#3730a3', 
        },
        secondary: {
          light: '#fbbf24', 
          DEFAULT: '#f59e0b', 
          dark: '#d97706', 
        },
        neutral: colors.gray, 
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], 
      },
    },
  },
  plugins: [],
};