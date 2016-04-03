'use strict';

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.dev');
const config = require('./config');

const app = express();
const compiler = webpack(webpackConfig);
const port = config.port;

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../dist/index.html')));

app.listen(port, '0.0.0.0', err => {
  if (err) return console.log('dev_server listen error', err);
  
  console.log(`Webpack server listening on port ${port}`);
});
