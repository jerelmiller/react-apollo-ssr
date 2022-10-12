'use strict';

const path = require('path');
const rimraf = require('rimraf');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV === 'production';
rimraf.sync(path.resolve(__dirname, '../build/client'));

webpack(
  {
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? 'source-map' : 'cheap-module-source-map',
    entry: [path.resolve(__dirname, '../src/index.tsx')],
    output: {
      path: path.resolve(__dirname, '../build/client'),
      filename: 'main.js',
    },
    resolve: {
      extensions: ['.js', '.ts', '.tsx', '.json'],
    },
    module: {
      rules: [
        {
          test: /\.(css)$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
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
    plugins: [new MiniCssExtractPlugin()],
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
