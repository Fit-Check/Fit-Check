const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './client/index.js',
	output: {
		publicPath: '/',
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	devServer: {
		static: {
			publicPath: '/dist',
			directory: path.resolve(__dirname, 'dist'),
		},
		proxy: {
			'/': 'http://localhost:3000/',
		},
		port: '8080',
	},
	mode: process.env.NODE_ENV,

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react'],
					},
				},
			},
			{
				test: /\.s?css/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				use: [
					{
						loader: 'file-loader',
					},
				],
			},
		],
	},
	plugins: [
		new HTMLWebpackPlugin({
			title: 'Development',
			template: './client/index.html',
		}),
	],
};
