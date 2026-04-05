/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'glass-white': 'rgba(255,255,255,0.08)',
        'glass-border': 'rgba(255,255,255,0.15)'
      },
      boxShadow: {
        glow: '0 0 30px rgba(99, 102, 241, 0.35)',
      }
    }
  },
  plugins: [],
};
