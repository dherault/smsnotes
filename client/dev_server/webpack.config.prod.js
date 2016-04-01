'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {
  // devtool: 'source-map',
  entry: [
    path.resolve(__dirname, '../src/client.js')
  ],
  output: {
    path: './',
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    // new webpack.ProvidePlugin({ // http://mts.io/2015/04/08/webpack-shims-polyfills/
    //   fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    // }),
    // new webpack.IgnorePlugin(/chalk/),
    // new webpack.IgnorePlugin(/node-fetch/),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      },
      comments: false
    })
  ],
  module: {
    loaders: [{
      test: /\.jsx?/,
      loader: 'babel',
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'stage-2', 'react']
      }
    }]
  }
};
