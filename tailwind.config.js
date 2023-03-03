module.exports = {
	content: ["./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"dark-green": "#03120f",
				"mid-green": "#104134",
				"light-green": "#2d9977",
				"row-gray": "#151515"
			},
			fontSize: {
				'xxs': '.65rem',
			},
			fontFamily: {
				'league-spartan': ['"League Spartan"', 'sans-serif'],
			},
		},
		fontFamily: {
			title: ["League Spartan"]
		}
	},
	plugins: [require("@tailwindcss/forms"), require('@tailwindcss/typography')]
};
