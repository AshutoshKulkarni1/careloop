/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hospital: {
          bg: '#F7F6F3',
          card: '#FFFFFF',
          ink: '#14211F',
          muted: '#5C6966',
          border: '#E4E2DC',
          'border-light': '#EFECE6',
          teal: '#0F5C54',
          'teal-dark': '#0B4640',
          'teal-light': '#E8F1EF',
          'teal-subtle': '#F2F7F6',
          accent: '#8A6F3E',
          'accent-light': '#F7F3EB',
          'accent-subtle': '#FAF7F2',
        }
      },
      fontFamily: {
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        kannada: ['"Noto Sans Kannada"', 'sans-serif'],
        hindi: ['"Noto Sans Devanagari"', 'sans-serif'],
      },
      borderRadius: {
        'card': '12px',
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(20, 33, 31, 0.04), 0 1px 2px rgba(20, 33, 31, 0.02)',
        'modal': '0 10px 25px -5px rgba(20, 33, 31, 0.1), 0 8px 10px -6px rgba(20, 33, 31, 0.05)',
      }
    },
  },
  plugins: [],
}
