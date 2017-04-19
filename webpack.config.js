var path = require('path');

module.exports = {
    entry: "./webpackEntry.js",
    output: {
        filename: "./bundle.js",
        path: __dirname + "/",
    },
    module: {
        loaders: [
          {
            test: /\.js?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
              presets: ['es2015', 'react']
            }
          }
        ],
    }
};
