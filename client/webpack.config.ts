import path from 'path';
import webpack, { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const isProd = process.env.NODE_ENV === 'production';

const webpackConfig = (env: {
  production: string;
  development: string;
}): Configuration => ({
  entry: './src/index.tsx',
  ...(env.production || !env.development ? {} : { devtool: 'eval-source-map' }),
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.scss', '.css'],
    //TODO waiting on https://github.com/dividab/tsconfig-paths-webpack-plugin/issues/61
    //@ts-ignore
    plugins: [new TsconfigPathsPlugin()],
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].[contenthash].js',
    publicPath: '/',
  },
  //@ts-ignore
  devServer: {
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.ts$|tsx/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
      // {
      //   test : /\.jsx?$/,
      //   loader : 'babel-loader',
      //   exclude : /node_modules/,
      // },
      {
        test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"
       },
      { test: /\\.(png|jpg|svg|gif)$/, 
        include: path.resolve(__dirname, './src/assets/images'),
        use: ['file-loader'] },
      {
        test: /\.svg$/,
        include: path.resolve(__dirname, './src/assets/icons'),
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(css)$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [
          // fallback to style-loader in development
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: !isProd,
              modules: {
                localIdentName: '[local]__[hash:base64:5]',
              }
            },
          },
          // Translates CSS into CommonJS
          {
            loader: 'sass-loader',
            options: {
              sourceMap: !isProd,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      ...(isProd
        ? {
            filename: '[name]-[chunkhash:6].css',
            chunkFilename: '[id]-[chunkhash:6].css',
          }
        : {}),
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new webpack.DefinePlugin({
      'process.env.PRODUCTION': env.production || !env.development,
    }),
    new ForkTsCheckerWebpackPlugin(),
  ],
});

export default webpackConfig;
