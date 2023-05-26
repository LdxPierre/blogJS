const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { dirname } = require("path");

module.exports = {
	entry: {
		main: path.join(__dirname, "src/index.ts"),
		form: path.join(__dirname, "src/form/form.ts"),
		topbar: path.join(__dirname, "src/assets/javascript/topbar.ts"),
	},
	output: {
		path: path.join(__dirname, "dist"),
		filename: "[name].bundle.js",
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /(node_modules)/,
				use: ["ts-loader"],
			},
			{
				test: /\.(sass|scss|css)$/i,
				use: ["style-loader", "css-loader", "sass-loader"],
			},
			{
				test: /\.(svg|eot|woff|woff2|ttf)$/,
				exclude: /(node_modules)/,
				loader: "file-loader",
			},
		],
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			filename: "index.html",
			template: path.join(__dirname, "./src/index.html"),
			chunks: ["main", "topbar"],
		}),
		new HtmlWebpackPlugin({
			filename: "form.html",
			template: path.join(__dirname, "./src/form/form.html"),
			chunks: ["form", "topbar"],
		}),
	],
	stats: "minimal",
	mode: "production",
	devServer: {
		open: false,
		static: path.resolve(__dirname, "./dist"),
		watchFiles: ["./src/**"],
		port: 4000,
		hot: true,
	},
};
