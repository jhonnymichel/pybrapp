const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');


module.exports = {
  entry: ['./src/js/index.js', 'material-design-icons/iconfont/material-icons.css'],
  output: {
    filename: 'js/index.js',
    path: path.resolve(__dirname, 'www'),
    publicPath: '/'
  },
  resolve: {
    alias: {
      'scss': path.resolve(__dirname, 'src/scss'),
      'templates': path.resolve(__dirname, 'src/templates'),
      'img': path.resolve(__dirname, 'src/img'),
      'misc': path.resolve(__dirname, 'src/misc'),
      'app': path.resolve(__dirname, 'src/js'),
      'config': path.resolve(__dirname, 'src/config.js'),
      'service-worker': path.resolve(__dirname, 'src/sw.js'),
      'manifest': path.resolve(__dirname, 'src/manifest.json'),
      'icons': path.resolve(__dirname, 'src/icons'),
    }
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          interpolate: true
        }
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [require('autoprefixer')],
            }
          },
          {
            loader: 'resolve-url-loader',
          },
        ]
      },
      {
        test:  /\.(jpe?g|png|gif|svg|obj|mtl|pdf|zip|ico|ttf|eot|woff|woff2)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            name(file) {
              if (file.match(/\.zip$|\.pdf$/)) {
                return './documents/[name].[ext]';
              }
              return './assets/[name].[ext]';
            }
          }
        },
        {
          loader: 'image-webpack-loader',
          options: {
            bypassOnDebug: true,
          },
        }]
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract([
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [require('autoprefixer')],
            }
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [path.resolve(__dirname, 'node_modules')],
              sourceMap: true, sourceMapContents: false
            }
          }
        ]),
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({filename: 'css/styles.css'}),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/templates/programacao.html'
    }),
  ]
}
