const { withNx, composePlugins } = require('@nx/webpack');
const CopyPlugin = require('copy-webpack-plugin');

const path = require('path');

module.exports = composePlugins(withNx(), (config) => {
  config.plugins.push(
    new CopyPlugin({
      patterns: [path.resolve(__dirname, 'src', 'index.d.ts')],
    })
  );
  config.module.rules = [
    {
      test: /\.ts(x)?$/,
      loader: 'esbuild-loader',
      exclude: /node_modules/,
      options: {
        tsconfig: path.resolve(__dirname, 'tsconfig.app.json'),
      },
    },
    {
      test: /\.s(a|c)]ss$/,
      exclude: /node_modules/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    },
  ];
  config.mode = 'development';
  config.module.rules.push({
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
  });
  config.externals = ['lodash/fp', '@nexus/components'];
  config.output.libraryTarget = 'umd';
  config.output.filename = 'index.js';
  return config;
});
