const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { spawn } = require('child_process')

/** @type {import('webpack').Configuration} */
module.exports = {
	mode: 'development',
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
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				loader: 'file-loader',
				options: {
					outputPath: 'assets/img',
					name: '[name].[ext]',
				},
			},
		],
	},
	target: 'electron-renderer',
	plugins: [
		new HtmlWebpackPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development'),
		}),
	],
	resolve: {
		extensions: [ '.js', '.jsx' ],
		alias: {
			'@image': path.resolve(__dirname, 'src/assets/image'),
			'@styles': path.resolve(__dirname, 'src/assets/styles'),
			'@components': path.resolve(__dirname, 'src/components'),
			'@context': path.resolve(__dirname, 'src/context'),
			'@hooks': path.resolve(__dirname, 'src/hooks'),
			'@page': path.resolve(__dirname, 'src/page'),
			'@router': path.resolve(__dirname, 'src/router'),
			'@layout': path.resolve(__dirname, 'src/layout'),
			'@utils': path.resolve(__dirname, 'src/utils'),
		},
	},
	devtool: 'cheap-source-map',
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
		historyApiFallback: true,
		stats: {
			colors: true,
			chunks: false,
			children: false,
		},
		before() {
			spawn('electron', [ '.' ], { shell: true, env: process.env, stdio: 'inherit' })
				.on('close', code => process.exit(0))
				.on('error', spawnError => console.error(spawnError))
		},
	},
}
