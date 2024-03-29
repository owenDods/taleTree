const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: './src/index.js',
	module: {
		rules: [
			{
				test: /\.(scss|css)$/i,
				use: [ 'style-loader', 'css-loader', 'postcss-loader', 'sass-loader' ]
			},
			{
				test: /\.(png|jpg|jpeg|gif)$/i,
				type: 'asset/resource'
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: [ 'babel-loader' ]
			},
			{
				test: /\.svg$/i,
				exclude: /node_modules/,
				use: [ 'svg-react-loader' ]
			}
		]
	},
	resolve: {
		extensions: [ '*', '.js', '.jsx' ],
	},
	devtool: 'inline-source-map',
	devServer: {
		static: {
			directory: path.resolve(__dirname, 'dist')
		},
		historyApiFallback: true
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'TaleTree',
			hash: true,
			template: 'index.html',
			favicon: path.resolve(__dirname, 'static', 'taleTree.ico')
		}),
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'static'),
				}
			]
		})
	],
	output: {
		filename: '[name].[contenthash].js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
		publicPath: '/'
	}
};
