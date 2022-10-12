'use strict';

const path = require('path');
const rimraf = require('rimraf');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const isProduction = process.env.NODE_ENV === 'production';

webpack(
  {
    target: 'node',
    mode: isProduction ? 'production' : 'development',
    entry: [path.resolve(__dirname, '../server/server.js')],
    output: {
      path: path.resolve(__dirname, '../build/server'),
      filename: 'server.js',
    },
    resolve: {
      extensions: ['.js', '.ts', '.tsx', '.json'],
    },
    externals: [nodeExternals()],
    module: {
      rules: [
        {
          test: /\.(css)$/,
          use: ['css-loader'],
          exclude: /node_modules/,
        },
        {
          test: /\.tsx?$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.js$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },
      ],
    },
  },
  (err, stats) => {
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      process.exit(1);
    }
    const info = stats.toJson();
    if (stats.hasErrors()) {
      console.log('Finished running webpack with errors.');
      info.errors.forEach((e) => console.error(e));
      process.exit(1);
    } else {
      console.log('Finished running webpack.');
    }
  }
);
