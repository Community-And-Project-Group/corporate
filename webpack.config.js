// Generated using webpack-cli https://github.com/webpack/webpack-cli

//eslint-disable-next-line no-undef
const path = require('path');
//eslint-disable-next-line no-undef
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

//eslint-disable-next-line no-undef
const isProduction = process.env.NODE_ENV === 'production';

const config = {
  entry: './src/js/index.js',
  output: {
    //eslint-disable-next-line no-undef
    path: path.resolve(__dirname, 'docs/assets'),
    filename: '[name].js',
  },
  devServer: {
    open: true,
    host: 'localhost',
    //eslint-disable-next-line no-undef
    contentBase: path.resolve(__dirname, 'docs'),
  },
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, { loader: 'css-loader', options: { url: false } }],
      },
    ],
  },
};

//eslint-disable-next-line no-undef
module.exports = () => {
  if (isProduction) {
    config.mode = 'production';

    config.plugins.push(new MiniCssExtractPlugin());
  } else {
    config.mode = 'development';
  }
  return config;
};
