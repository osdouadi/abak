/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: {
          500: `var(--color-black-500)`
        },
        blue: {
          600: `var(--color-blue-600)`
        }
      },
       
    container: {
      center: true,
    },
    },
    fontSize: {
      'xl': ['1.265rem', '1.5rem'],
      '1xl': ['1.575rem', '2.4rem'],
      '2xl': ['1.625rem', '2.6rem'],
      '3xl': ['2.175rem', '3.6rem'],
      '4xl': ['2.495rem', '3.8rem'],
      '5xl': ['3rem', '3.6rem'],
    },
    
    },
  plugins: [require("daisyui")],
}