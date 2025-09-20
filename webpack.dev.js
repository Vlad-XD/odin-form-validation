const { merge } = require('webpack-merge');
const config = require('./webpack.config.js');
const fileWatchList = ["./index.html"];

module.exports = merge(config, {
  mode: 'development',
  devServer: {
    watchFiles: fileWatchList,
  },
    plugins: [

    ],
});