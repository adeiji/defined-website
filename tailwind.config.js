module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#074a5a',
          light: '#0a6982',
          dark: '#053642',
        },
        secondary: {
          DEFAULT: '#ff871e',
          light: '#ffa64e',
          dark: '#e67000',
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        display: ['Fascinate', 'cursive'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  // Optimizations for production build
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  // Production optimizations to minimize CSS size
  mode: 'jit',
}