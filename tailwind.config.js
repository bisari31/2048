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
        md: '40px',
        lg: '45px',
        xl: '60px',
        '2xl': '60px',
        '3xl': '80px',
      },
      colors: {
        title: '#F23041',
        score: '#504E50',
        button: '#F28B84',
        bg: '#FFFCEB',
        border: '#FBE8B0',
        card: {
          2: '#FFB649',
          4: '#E77676',
          8: '#618BF5',
          16: '#F46335',
          32: '#2FB786',
          64: '#563E9A',
          128: '#5A2B4A',
          256: '#EA598D',
          512: '#F23041',
          1024: '#753685',
          2048: '#C21841',
          4096: '#505BC0',
        },
      },
    },
  },
  plugins: [],
};
