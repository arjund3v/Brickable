/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [`./views/**/*.ejs`], // all .ejs files
	theme: {
		extend: {},
	},
	daisyui: {
		themes: ['bumblebee'],
	},
	plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
