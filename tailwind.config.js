/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [`./views/*.html`], // all .html files
	theme: {
		extend: {},
	},
	daisyui: {
		themes: ['bumblebee'],
	},
	plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
