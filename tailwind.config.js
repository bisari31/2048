/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontSize: {
        xs: '16px',
        sm: '20px',
        md: '35px',
        lg: '40px',
        xl: '50px',
        '2xl': '60px',
        '3xl': '80px',
      },

      colors: {
        score: '#504E50',
        bg: '#FFFCEB',
        border: '#FBE8B0',
        title: '#F23041',
        button: {
          default: '#2FB786',
          hover: '#2aa377',
          active: '#258e68',
          2: '#46a080',
          3: '#578f7b',
          4: '#6e7874',
        },
        'black-rgba': 'rgba(0,0,0,0.5)',
        card: {
          2: '#FFB649',
          4: '#E77676',
          8: '#618BF5',
          16: '#F46335',
          32: '#2FB786',
          64: '#563E9A',
          128: '#5A2B4A',
          256: '#EA598D',
          512: '#C21841',
          1024: '#753685',
          2048: '#F23041',
        },
      },
      keyframes: {},
    },
  },
  plugins: [],
};
