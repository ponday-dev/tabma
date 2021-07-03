// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpack = require('webpack');

module.exports = (_, options) => {
  return {
    entry: './src/index.ts',
    output: {
      path: path.resolve(__dirname, options.mode === 'production' ? 'bin' : 'dist'),
      filename: 'index.js',
    },
    target: 'node',
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: ['ts-loader'],
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    plugins: [new webpack.BannerPlugin({ banner: '#! /usr/bin/env node', raw: true })],
  };
};
