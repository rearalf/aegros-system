const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Any directories you will be adding code/files into, need to be added to this array so webpack will pick them up
const defaultInclude = path.resolve(__dirname, 'src');

module.exports = {
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.(s[ac]ss|css)$/i,
				use: [ 'style-loader', 'css-loader', 'sass-loader' ],
				include: defaultInclude,
			},
			{
				test: /\.(jpe?g|png|gif)$/,
				use: [ { loader: 'file-loader?name=img/[name]__[hash:base64:5].[ext]' } ],
				include: defaultInclude,
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				use: [ { loader: 'file-loader?name=font/[name]__[hash:base64:5].[ext]' } ],
				include: defaultInclude,
			},
		],
	},
	resolve: {
		extensions: [ '.js', '.jsx' ],
		alias: {
			'@image': path.resolve(__dirname, 'src/assets/image'),
			'@styles': path.resolve(__dirname, 'src/assets/styles'),
			'@components': path.resolve(__dirname, 'src/components'),
			'@context': path.resolve(__dirname, 'src/context'),
			'@hooks': path.resolve(__dirname, 'src/hooks'),
			'@page': path.resolve(__dirname, 'src/page'),
		},
	},
	target: 'electron-renderer',
	plugins: [
		new HtmlWebpackPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production'),
		}),
		// new MinifyPlugin()
	],
	stats: {
		colors: true,
		children: false,
		chunks: false,
		modules: false,
	},
	optimization: {
		minimize: true,
	},
};
