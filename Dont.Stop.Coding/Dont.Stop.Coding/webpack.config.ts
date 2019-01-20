"use strict";

var HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
	mode: "development",
	entry: ['./bundle-prod/scripts.js'],
	output: {
		path: path.resolve(__dirname + '/dist'),
		filename: 'scripts.js'
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './templates/index.html',
			filename: "index.html"
		})
	]
}