const fs = require('fs');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const getPackageVersion = () => {
  let pkg = JSON.parse(fs.readFileSync('./package.json'));
  return pkg.version;
};

module.exports = {
  entry: {
    'alien': './src/alien.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  externals: [
  ],
  resolve: {
    extensions: ['.html', '.less', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'string-replace-loader',
            options: {
              multiple: [
                { search: '{{version}}', replace: getPackageVersion() }
              ]
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: {
          loader: 'jshint-loader',
          options: { esversion: 6, debug: false }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'less-loader', options: { compress: true } }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/alien.html',
      filename: './site-page-skin.html',
      inject: false,
      minify: {
        removeAttributeQuotes: false,
        minifyJS: false
      }
    })
  ]
};