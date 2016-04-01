'use strict';

const path = require('path');
const webpack = require('webpack');
const config = require('./config');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    // 'eventsource-polyfill', // necessary for hot reloading with IE
    `webpack-hot-middleware/client?path=${config.url}__webpack_hmr`,
    path.resolve(__dirname, '../src/client.js')
  ],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js',
    publicPath: config.url
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // new webpack.ProvidePlugin({ // http://mts.io/2015/04/08/webpack-shims-polyfills/
    //   fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    // }),
    // new webpack.IgnorePlugin(/chalk/),
    // new webpack.IgnorePlugin(/node-fetch/)
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-2', 'react', 'react-hmre']
        }
      },
    ]
  }
};
