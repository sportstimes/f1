module.exports = {
	purge: ["./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
	darkMode: "media", // 'media' or 'class'
	theme: {
		extend: {
			colors: {
				"dark-green": "#03120f",
				"mid-green": "#104134",
				"light-green": "#2d9977",
				"row-gray": "#151515"
			}
		},
		fontFamily: {
			title: ["LeagueSpartan"]
		}
	},
	variants: {
		extend: {
			backgroundColor: ["checked"]
		}
	},
	plugins: [require("@tailwindcss/forms"), require('@tailwindcss/typography')]
};
