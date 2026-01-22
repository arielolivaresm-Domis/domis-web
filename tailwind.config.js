/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      keyframes: {
        laser: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateX(200%)', opacity: '0' },
        },
        'cycle-text': {
          '0%, 58%': { opacity: '1', filter: 'blur(0px)' },
          '60%, 98%': { opacity: '0', filter: 'blur(2px)' },
          '100%': { opacity: '1', filter: 'blur(0px)' },
        },
        'cycle-image': {
          '0%, 58%': { opacity: '0', transform: 'scale(0.95)' },
          '60%, 98%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.95)' },
        }
      },
      animation: {
        'laser-v1': 'laser 3s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'text-cycle': 'cycle-text 6s infinite',
        'image-cycle': 'cycle-image 6s infinite',
      },
    },
  },
  plugins: [],
}