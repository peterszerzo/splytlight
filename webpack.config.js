const path = require('path');
const webpack = require('webpack');
const postCssCssNext = require('postcss-cssnext');
const validate = require('webpack-validator');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const commonPlugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  }),
  new HtmlWebpackPlugin({
    template: './src/index.pug',
    inject: true,
    hash: true
  }),
  new HtmlWebpackPlugin({
    filename: '200.html',
    template: './src/index.pug',
    inject: true,
    hash: true
  })
];

const productionPlugins = [
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin()
];

const config = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.resolve('./build'),
    publicPath: '/',
    filename: 'index.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style!css!postcss'
      },
      {
        test: /\.js$/,
        loader: 'babel'
      },
      {
        test: /\.json/,
        loader: 'json'
      },
      {
        test: /\.pug/,
        loader: 'pug'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.css', '.json']
  },
  devtool: 'source-map',
  plugins: (process.env.NODE_ENV === 'development')
  ?
  commonPlugins
  :
  commonPlugins.concat(productionPlugins),
  postcss() {
    return [
      postCssCssNext({
        browsers: ['ie >= 10', 'last 3 versions']
      })
    ];
  }
};

module.exports = validate(config);
