/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        border: '#2a2a2a',
        primary: {
          50: '#1a1a1a',
          100: '#2a2a2a',
          200: '#3a3a3a',
          300: '#4a4a4a',
          400: '#5a5a5a',
          500: '#6a6a6a',
          600: '#7a7a7a',
          700: '#8a8a8a',
          800: '#9a9a9a',
          900: '#aaaaaa',
        },
        nature: {
          50: '#0f1a0f',
          100: '#1a2a1a',
          200: '#2a3a2a',
          300: '#3a4a3a',
          400: '#4a5a4a',
          500: '#5a6a5a',
          600: '#6a7a6a',
          700: '#7a8a7a',
          800: '#8a9a8a',
          900: '#9aaa9a',
        },
        earth: {
          50: '#1a1a0f',
          100: '#2a2a1a',
          200: '#3a3a2a',
          300: '#4a4a3a',
          400: '#5a5a4a',
          500: '#6a6a5a',
          600: '#7a7a6a',
          700: '#8a8a7a',
          800: '#9a9a8a',
          900: '#aaaa9a',
        },
        accent: {
          orange: '#ff6b35',
          blue: '#4a90e2',
          green: '#7ed321',
          purple: '#9013fe',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        }
      }
    },
  },
  plugins: [],
}