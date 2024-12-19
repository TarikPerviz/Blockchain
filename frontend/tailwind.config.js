/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'tick-tick': 'tickTick 2s ease-in-out infinite',
      },
      keyframes: {
        tickTick: {
          '0%, 100%': {
            transform: 'rotate(-5deg)',
          },
          '50%': {
            transform: 'rotate(5deg)',
          },
        },
      },
    }
  },
  plugins: [],
}

