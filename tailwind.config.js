/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          950: '#050811',
          900: '#070b16',
          850: '#0b1224',
          800: '#101a33',
          700: '#18274d',
          border: '#1e2f5b',
          cyan: '#00f0ff',
          neon: '#06b6d4',
          glow: '#38bdf8',
        },
        navy: {
          900: '#07111e',
          850: '#0b192c',
          800: '#0f243f',
          700: '#163359',
          600: '#1f487e',
        },
        saffron: {
          400: '#ffaa55',
          500: '#ff8822',
          600: '#ea6600',
        },
        mausam: {
          blue: '#1e88e5',
          lightBlue: '#e3f2fd',
          darkBlue: '#0d47a1',
          sky: '#38bdf8',
          teal: '#0d9488',
        }
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -4px rgba(6, 182, 212, 0.4)',
        'glow-blue': '0 0 25px -4px rgba(59, 130, 246, 0.4)',
        'glow-violet': '0 0 25px -4px rgba(139, 92, 246, 0.4)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-subtle': 'bounce 2s infinite',
        'glow-pulse': 'glow 2.5s ease-in-out infinite alternate',
      }
    },
  },
  plugins: [],
}
