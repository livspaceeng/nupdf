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
		port: 9090
	},
	resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js', // 'vue/dist/vue.common.js' for webpack 1
			'pdfkit': 'pdfkit/js/pdfkit.standalone.js'
    }
  }
}
