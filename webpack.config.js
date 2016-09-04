const path = require('path');
const webpack = require('webpack');
const postCssCssNext = require('postcss-cssnext');
const postCssImport = require('postcss-import');
const validate = require('webpack-validator');

const config = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.resolve('./build/'),
    publicPath: 'http://localhost:3000/',
    filename: 'index.js',
    sourceMapFilename: 'index.js.map'
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
        loader: 'file?name=[name].[ext]!html-minify'
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
      postCssImport(),
      postCssCssNext({
        browsers: ['ie >= 10', 'last 3 versions']
      })
    ];
  },
  devServer: {
    contentBase: 'build/',
    hot: true,
    inline: true,
    quiet: true,
    open: true,
    port: 3000,
    historyApiFallback: true
  }
};

module.exports = validate(config);
