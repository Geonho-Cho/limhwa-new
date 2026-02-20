/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0A3D62',
          dark: '#082d49',
          light: '#0d4a75',
        },
        accent: {
          DEFAULT: '#C9A227',
          dark: '#a8871f',
          light: '#d4b23d',
        },
        dark: '#1A1A2E',
        light: '#F8F9FA',
      },
      fontFamily: {
        sans: ['Pretendard', 'Noto Sans KR', 'sans-serif'],
        heading: ['Inter', 'Pretendard', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
