const fs = require('fs');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
require('dotenv-safe').config();
const appUser = Buffer.from(process.env.APPUSER).toString('base64');
const noAlien = Buffer.from(process.env.NOALIEN).toString('base64');

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
                { search: '{{version}}', replace: getPackageVersion(), flags: 'g' },
                { search: '{{year}}', replace: new Date().getFullYear().toString(), flags: 'g' }
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
          loader: 'eslint-loader',
          options: { 
            formatter: require("eslint-friendly-formatter")
          }
        }
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'string-replace-loader',
            options: {
              multiple: [
                { search: '{{appuser}}', replace: appUser, flags: '' },
                { search: '{{noalien}}', replace: noAlien, flags: '' }
              ]
            }
          }
        ]
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
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          { loader: 'less-loader' }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "alien.css"
    }),    
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