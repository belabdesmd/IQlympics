/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/client/**/*.{js,ts,jsx,tsx}",
    "./src/client/index.html",
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand colors
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        // Vibrant game colors
        game: {
          purple: '#8b5cf6',
          pink: '#ec4899',
          blue: '#06b6d4',
          green: '#10b981',
          yellow: '#f59e0b',
          orange: '#f97316',
          red: '#ef4444',
        },
        // Background gradients
        gradient: {
          start: '#3b82f6', // blue-500
          middle: '#8b5cf6', // purple-500
          end: '#ec4899',    // pink-500
        },
        // Success/Error states
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
      },
      fontFamily: {
        'game': ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'game-xs': ['0.75rem', { lineHeight: '1rem', fontWeight: '600' }],
        'game-sm': ['0.875rem', { lineHeight: '1.25rem', fontWeight: '600' }],
        'game-base': ['1rem', { lineHeight: '1.5rem', fontWeight: '600' }],
        'game-lg': ['1.125rem', { lineHeight: '1.75rem', fontWeight: '700' }],
        'game-xl': ['1.25rem', { lineHeight: '1.75rem', fontWeight: '700' }],
        'game-2xl': ['1.5rem', { lineHeight: '2rem', fontWeight: '800' }],
        'game-3xl': ['1.875rem', { lineHeight: '2.25rem', fontWeight: '800' }],
        'game-4xl': ['2.25rem', { lineHeight: '2.5rem', fontWeight: '900' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'game': '1rem',
        'game-lg': '1.5rem',
        'game-xl': '2rem',
      },
      boxShadow: {
        'game': '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'game-lg': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'game-xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      backdropBlur: {
        'game': '12px',
      },
    },
  },
  plugins: [],
}