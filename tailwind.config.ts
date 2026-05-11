import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Luxury Gold Palette
        gold: {
          50: '#fef9f0',
          100: '#fef3e6',
          200: '#fce8cd',
          300: '#f9d7a0',
          400: '#f5c170',
          500: '#d4a574', // Primary luxury gold
          600: '#c89350',
          700: '#a67338',
          800: '#8a5c2f',
          900: '#6d4727',
        },
        // Premium background colors
        cream: {
          50: '#faf8f5',
          100: '#f5f2ed',
          200: '#ece7e0',
        },
        // Dark elegance
        charcoal: {
          900: '#1a1a1a',
          800: '#2d2d2d',
          700: '#404040',
        },
      },
      fontFamily: {
        display: ['Georgia', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #d4a574 0%, #f5c170 100%)',
        'gradient-luxury': 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
        'gradient-gold-dark': 'linear-gradient(135deg, rgba(212, 165, 116, 0.1) 0%, rgba(245, 193, 112, 0.05) 100%)',
      },
      boxShadow: {
        'gold-sm': '0 4px 6px -1px rgba(212, 165, 116, 0.1)',
        'gold-md': '0 10px 15px -3px rgba(212, 165, 116, 0.15)',
        'gold-lg': '0 20px 25px -5px rgba(212, 165, 116, 0.2)',
        'luxury': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
      spacing: {
        gutter: '1rem',
        section: '4rem',
      },
      animation: {
        'shimmer': 'shimmer 2s infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212, 165, 116, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(212, 165, 116, 0.6)' },
        },
      },
      borderRadius: {
        'luxury': '12px',
      },
    },
  },
  plugins: [],
};

export default config;
