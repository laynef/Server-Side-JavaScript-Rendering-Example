const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin({
	filename: '[name].css',
});


module.exports = {
	name: 'browser',
	context: path.join(__dirname, '..'),
	entry: [
		'tether',
		`font-awesome-loader!${__dirname}/../bootstrap/font-awesome.config.js`,
		`bootstrap-loader/lib/bootstrap.loader?extractStyles&configFilePath=${__dirname}/../bootstrap/bs4.yml!bootstrap-loader/no-op.js`,
		'./web/client.js',
	],
	target: "web",
	output: {
		path: path.resolve(__dirname, '..', 'assets', 'dist'),
		filename: '[name].js',
	},
	module: {
		rules: [
			{
				test: /.jsx?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
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
					use: ['css-loader', 'sass-loader', 'postcss-loader'],
				}),
			},
			{
				test: /.less$/,
				use: extractCSS.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'less-loader', 'postcss-loader'],
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
				use: 'url-loader',
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
		extensions: ['*', '.js', '.jsx', '.json', '.css', '.scss', '.sass'],
		moduleExtensions: ['-loader'],
	},
	plugins: [
		new UglifyJSPlugin(),
		new webpack.DefinePlugin({
			__DEVELOPMENT__: false,
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
			PropTypes: 'prop-types',
			$: 'jquery',
			jQuery: 'jquery',
			jquery: 'jquery',
		}),
		new ExtractTextPlugin({
			filename: '[name].css',
		}),
		new webpack.NoEmitOnErrorsPlugin(),
	],
};
