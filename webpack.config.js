// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

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
  };
};
