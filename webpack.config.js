'use strict';

const path = require('path');
const webpack = require('webpack');
const postCssCssNext = require('postcss-cssnext');
const validate = require('webpack-validator');

const config = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.resolve('./build'),
    publicPath: '',
    filename: 'index.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style', 'css', 'postcss']
      },
      {
        test: /\.js$/,
        loaders: ['babel']
      },
      {
        test: /\.json/,
        loaders: ['json']
      },
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.elm', '.css', '.json']
  },
  devtool: 'source-map',
  plugins: (process.env.NODE_ENV === 'development')
  ?
  []
  :
  [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ],
  postcss() {
    return [
      postCssCssNext({
        browsers: ['ie >= 10', 'last 3 versions']
      })
    ];
  }
};

module.exports = validate(config);
