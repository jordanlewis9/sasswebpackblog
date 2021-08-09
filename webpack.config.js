const path = require("path");
const HTMLWebpackPlugin = require('html-webpack-plugin');

const config = {
  mode: "development",
  entry: "./index.js",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  devServer: {
    port: 3000,
    open: true,
    contentBase: path.resolve(__dirname, "dist"),
    hot: true
  },
  plugins: [new HTMLWebpackPlugin({
    template: "./index.html"
  })],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/
      }
    ]
  }
}

module.exports = config;