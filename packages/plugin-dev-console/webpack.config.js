import path from 'path'
import process from 'process'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'

export default {
  mode: 'development',
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(process.cwd(), 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
            ],
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.jsx', '.js'],
  },
  devServer: {
    static: {
      directory: './dist',
      watch: true,
    },
    historyApiFallback: true,
    port: process.env.SHRINE_PORT,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.ENV_APP_NAME': JSON.stringify(process.env.APP_NAME),
      'process.env.ENV_SERVICE_PORT': JSON.stringify(process.env.SERVICE_PORT),
    }),
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
  ],
};
