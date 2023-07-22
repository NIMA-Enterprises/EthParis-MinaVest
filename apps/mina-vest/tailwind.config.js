/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		colors: {
			"transparent": "transparent",
			"mina-black": "#2D2D2D",
			"mina-orange": "#FF603B",
			"mina-grey": "#B7CDD8",
			"mina-light-grey": "#E7F2F6",
			"mina-white": "#FFFFFF",
			"green-success": "#16A34A",
			"green-light-success": "#BBF7D0",

			...colors,
		},
		fontFamily: {
			main: ['"Space Grotesk"', "sans-serif"],
		},
		fontSize: {
			h1: [
				"24px",
				{
					lineHeight: "32px",
					letterSpacing: "-0.02em",
					fontWeight: "bold",
				},
			],
			h2: [
				"20px",
				{
					lineHeight: "28px",
					letterSpacing: "-0.02em",
					fontWeight: "bold",
				},
			],
			xsmall: [
				"12px",
				{
					lineHeight: "16px",
					letterSpacing: "normal",
					fontWeight: "regular",
				},
			],
			paragraph: [
				"16px",
				{
					lineHeight: "24px",
					letterSpacing: "normal",
					fontWeight: "regular",
				},
			],
			small: [
				"14px",
				{
					lineHeight: "20px",
					letterSpacing: "normal",
					fontWeight: "regular",
				},
			],
		},

		extend: {
			backgroundPosition: {
				"pos-0": "0% 0%",
				"pos-100": "100% 100%",
			},
			boxShadow: {
				main: "0px 4px 20px rgba(226, 172, 207, 0.3)",
			},
		},
	},
	plugins: [
		require("tailwindcss-debug-screens"),
		require("@tailwindcss/line-clamp"),
	],
};
