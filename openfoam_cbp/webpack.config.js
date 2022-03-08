const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html", 
  filename: "index.html"
});

module.exports = {
  entry: {
    main: "./src/index.js",
  },
  devtool: "eval-source-map",
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "[name].js",
    publicPath:'/'
  },
  plugins: [htmlPlugin],
  watchOptions: {
    aggregateTimeout: 200,
    poll: 10000,
  },
  module: {
    rules: [
      { test: /\.html$/, loader: 'html-loader' },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        //exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
        ],
      }
    ]
  },
  devServer: {
    allowedHosts: 'all',
    compress: true,
    hot: true,
    historyApiFallback: true,
    watchFiles: ['src/*', 'public/*'],
    port: 8000,
    proxy: {
      '/api': 'http://localhost:3000',
    },
  }
};