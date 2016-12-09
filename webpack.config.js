const path = require('path')
const webpack = require('webpack')
const postCssCssNext = require('postcss-cssnext')
const validate = require('webpack-validator')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const commonPlugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
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
]

const productionPlugins = [
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin(),
  new ExtractTextWebpackPlugin('styles.css'),
  new FaviconsWebpackPlugin({
    logo: './src/favicon.png',
    inject: true
  })
]

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
      isDev ? {
        test: /\.css$/,
        loader: 'style!css!postcss'
      } : {
        test: /\.css$/,
        loader: ExtractTextWebpackPlugin.extract('style', 'css!postcss')
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
      },
      {
        test: /\.svg/,
        loader: 'file?name=[name].[ext]'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.css', '.json']
  },
  devtool: 'source-map',
  plugins: isDev ? commonPlugins : commonPlugins.concat(productionPlugins),
  postcss () {
    return [
      postCssCssNext({
        browsers: ['ie >= 10', 'last 3 versions']
      })
    ]
  }
}

module.exports = validate(config)
