/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [`./views/*.html`], // all .html files
	theme: {
		extend: {},
	},
	daisyui: {
		themes: ['garden'],
	},
	plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
