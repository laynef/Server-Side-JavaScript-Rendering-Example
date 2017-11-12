const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin({
	filename: '[name].css',
	allChunks: true,
});

const makeId = () => {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (var i = 0; i < 20; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}

	return text;
};


module.exports = {
	name: 'browser',
	context: path.join(__dirname, '..'),
	entry: [
		'tether',
		`font-awesome-loader!${__dirname}/../bootstrap/font-awesome.config.js`,
		`bootstrap-loader/lib/bootstrap.loader?extractStyles&configFilePath=${__dirname}/../bootstrap/bs4.yml!bootstrap-loader/no-op.js`,
		'./web/client.js',
	],
	output: {
		path: path.resolve(__dirname, '..', 'assets', 'dist'),
		filename: '[name].js',
	},
	target: "web",
	module: {
		rules: [
			{
				test: /.jsx?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
					},
					{
						loader: 'eslint-loader',
					},
				],
			},
			{
				test: /.css$/,
				use: extractCSS.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'postcss-loader'],
				}),
			},
			{
				test: /.scss$/,
				use: extractCSS.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'postcss-loader', 'sass-loader'],
				}),
			},
			{
				test: /.less$/,
				use: extractCSS.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'postcss-loader', 'less-loader'],
				}),
			},
			{
				test: /.json$/,
				use: [
					{
						loader: 'json-loader',
					},
				],
			},
			{
				test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: 'url-loader?limit=10000',
			},
			{
				test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
				use: 'file-loader',
			},
			{
				test: /bootstrap\/dist\/js\/umd\//,
				use: 'imports-loader?jQuery=jquery',
			},
		],
	},
	resolve: {
		extensions: ['*', '.js', '.jsx', '.json', '.scss', '.sass', '.css'],
		moduleExtensions: ['-loader'],
	},
	plugins: [
		new webpack.DefinePlugin({
			__DEVELOPMENT__: true,
			__CLIENT__: true,
			__HASHID__: '1',
		}),
		new webpack.LoaderOptionsPlugin({
			options: {
				devtools: 'source-map',
				postcss: [autoprefixer],
			},
		}),
		new webpack.ProvidePlugin({
			'window.Tether': 'tether',
			Popper: ['popper.js', 'default'],
			Tooltip: ['tooltip.js', 'default'],
			$: 'jquery',
			PropTypes: 'prop-types',
			jQuery: 'jquery',
			jquery: 'jquery',
		}),
		new ExtractTextPlugin({
			filename: '[name].css',
			allChunks: true,
		}),
	],
};
