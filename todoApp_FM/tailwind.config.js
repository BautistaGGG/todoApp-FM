/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode:'class',
  theme: {
    extend: {
      backgroundImage:{
        'bg-lightMode': 'url("./assets/bg-desktop-light.jpg")',
        'bg-darkMode': 'url("./assets/bg-desktop-dark.jpg")'
      },
      fontFamily:{
        'Josefin-sans': '"Josefin Sans", sans-serif;'
      }
    },
  },
  variants:{
    extend:{
      backgroundColor: ['dark'],
      textColor: ['dark'],
    }
  },
  plugins: [],
}