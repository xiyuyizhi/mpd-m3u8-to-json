const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

const ROOT = process.cwd();
const config = {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    filename: path.join(ROOT, 'src/index.ts')
  },
  output: {
    library: 'VParser',
    libraryTarget: 'umd',
    globalObject: 'this',
    filename: 'vparser.min.js',
    path: path.join(ROOT, 'libs/')
  },
  resolve: {
    extensions: ['.ts']
  },
  optimization: {
    minimizer: [new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: true
          },
          mangle: {
            safari10: true
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true
          }
        },
        parallel: true,
        cache: true,
        sourceMap: true
      })]
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /.ts$/,
        exclude: /node_modules/,
        include: [path.join(ROOT, 'src')],
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              ...JSON.parse(fs.readFileSync(path.resolve(ROOT, '.babelrc')))
            }
          }
        ]
      }
    ]
  }
};

module.exports = config;
