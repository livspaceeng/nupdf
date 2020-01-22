const path = require("path");

module.exports = {
	mode: "development",
	entry: "./src/index.js",
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist"),
		libraryTarget: "umd"
	},
	devServer: {
		contentBase: path.resolve(__dirname, "public"),
		compress: true,
		port: 9000
	}
}
