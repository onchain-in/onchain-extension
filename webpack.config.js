const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: 'production',
  entry: {
    popup: './src/popup/popup.tsx',
    contentScripts: './src/scripts/contentScripts.tsx',
    background: './src/background.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, // .ts 또는 .tsx 파일을 대상으로 합니다.
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/, // .js 또는 .jsx 파일을 대상으로 합니다.
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      zlib: require.resolve('browserify-zlib'),
      url: require.resolve('url/'),
      vm: false,
      buffer: require.resolve("buffer/"),
      process: require.resolve("process/browser")
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/popup.html',
      filename: 'popup.html',
      chunks: ['popup']
    }),
    new webpack.ProvidePlugin({
      process: "process/browser"
    }),
    new CopyPlugin({
      patterns: [
        { from: "public/manifest.json", to: "manifest.json" },
        { from: "public/images", to: "images" },
      ],
    }),
  ],
};
