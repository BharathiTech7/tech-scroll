/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // TechScroll AI Design System
        brand: {
          50: '#f0f4ff',
          100: '#e0eaff',
          200: '#c0d0ff',
          300: '#8fa8ff',
          400: '#5c7bff',
          500: '#3a5cff',
          600: '#2040f5',
          700: '#1a32d6',
          800: '#1928a8',
          900: '#1a2680',
        },
        accent: {
          cyan: '#06b6d4',
          purple: '#a855f7',
          pink: '#ec4899',
          emerald: '#10b981',
          amber: '#f59e0b',
          rose: '#f43f5e',
        },
        dark: {
          950: '#030712',
          900: '#0a0f1e',
          800: '#0f172a',
          700: '#1e293b',
          600: '#334155',
          500: '#475569',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-brand': 'linear-gradient(135deg, #3a5cff 0%, #a855f7 50%, #06b6d4 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0a0f1e 0%, #1e293b 100%)',
        'mesh-bg': `radial-gradient(at 40% 20%, hsla(228,100%,74%,0.15) 0px, transparent 50%),
                    radial-gradient(at 80% 0%, hsla(270,100%,76%,0.1) 0px, transparent 50%),
                    radial-gradient(at 0% 50%, hsla(191,100%,56%,0.08) 0px, transparent 50%)`,
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.4s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(58,92,255,0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(168,85,247,0.5)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      boxShadow: {
        'glow-brand': '0 0 30px rgba(58,92,255,0.4)',
        'glow-purple': '0 0 30px rgba(168,85,247,0.4)',
        'glow-cyan': '0 0 30px rgba(6,182,212,0.4)',
        'card': '0 4px 24px rgba(0,0,0,0.4), 0 1px 4px rgba(0,0,0,0.3)',
        'card-hover': '0 8px 48px rgba(0,0,0,0.5), 0 2px 8px rgba(58,92,255,0.2)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
