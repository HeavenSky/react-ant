var path = require('path');
var webpack = require('webpack');

module.exports = {
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	entry: {
		shim: [
			'console-polyfill',
			'es5-shim',
			'es5-shim/es5-sham',
			'html5shiv',
		],
		vendor: [
			'raf/polyfill',
			'babel-polyfill',
			'react',
			'react-dom',
			'react-router-dom',
			'redux',
			'react-redux',
			'redux-logger',
			'redux-thunk',
			'redux-undo',
			'pubsub-js',
			'signals',
			'numeral',
			'jquery',
			'moment',
		],
	},
	output: {
		path: path.join(__dirname, 'build'),
		filename: '[name].dll.js',
		library: '[name]_[chunkhash:5]',
		// library 与 DllPlugin 中的 name 一致
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': { 'NODE_ENV': JSON.stringify('development') },
		}),
		new webpack.ContextReplacementPlugin(
			/moment[\/\\]locale$/i,
			/^\.\/(zh-cn)$/i,
		),
		new webpack.DllPlugin({
			context: __dirname,
			name: '[name]_[chunkhash:5]',
			path: path.join(__dirname, 'build', '[name].manifest.json'),
		}),
	],
};