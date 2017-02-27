const webpack = require('webpack');
const path = require('path');

const config = {

  entry: './index.jsx',

  output: {
    path: '/public',
    filename: 'bundle.js',
    publicPath: '/'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },

  plugins: process.env.NODE_ENV === 'production' ? [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    //new webpack.optimize.UglifyJsPlugin()
  ] : []

}

module.exports = config;