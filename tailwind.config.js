module.exports = {
  important: true,
  content: [
    'src/components/**/*.{js,ts,jsx,tsx}',
    'src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-green': '#03120f',
        'mid-green': '#104134',
        'light-green': '#2d9977',
        'row-gray': '#151515',
        'row-gray-darker': '#101010',
      },
      fontSize: {
        xsm: '.65rem',
      },
      fontFamily: {
        'league-spartan': ['var(--font-league-spartan)'],
      },
    },
    fontFamily: {
      title: ['League Spartan'],
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
