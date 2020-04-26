/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

// POST CSS PLUGINS
const postcssPresetEnv = require('postcss-preset-env');
const importCSS = require('postcss-import');
const hexrgba = require('postcss-hexrgba');

const developmentEnvironment = process.env.NODE_ENV === 'development';
const productionEnvironment = process.env.NODE_ENV === 'production';

module.exports = {
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    port: 3000,
    open: true,
    overlay: true,
    hot: true,
    stats: {
      assets: false,
      builtAt: true,
      cached: false,
      cachedAssets: false,
      children: false,
      chunks: false,
      colors: true,
      depth: false,
      entrypoints: false,
      env: true,
      errors: true,
      errorDetails: true,
      errorStack: true,
      hash: true,
      logging: false,
      outputPath: false,
      performance: true,
      reasons: false,
      source: false,
      timings: false,
      usedExports: false,
      version: true,
      warnings: true,
      chunkRelations: false,
    },
    index: 'index.html',
    historyApiFallback: true,
  },
  mode: productionEnvironment ? 'production' : 'development',
  optimization: {
    minimize: productionEnvironment,
    minimizer: [
      new OptimizeCSSAssetsPlugin({}),
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        terserOptions: {
          keep_classnames: true,
          keep_fnames: true,
        },
      }),
    ],
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
    },
  },
  entry: ['react-hot-loader/patch', `${__dirname}/src/index.js`],
  output: {
    path: `${__dirname}/dist`,
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: 'js/[name].js',
  },
  stats: {
    colors: true,
    errorDetails: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      __DEV__: developmentEnvironment,
    }),
    new CopyWebpackPlugin([
      { from: 'src/images', to: 'images' },
      { from: 'src/assets', to: 'assets' },
      { from: 'src/fonts', to: 'fonts' },
    ]),
    new HtmlWebpackPlugin({
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
      filename: 'index.html',
      template: path.join(__dirname, 'src', 'index.html'),
    }),
    new MiniCssExtractPlugin({
      chunkFilename: 'css/[name].css',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        include: [path.join(__dirname, 'src')],
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader?sourceMap',
          {
            loader: 'postcss-loader',
            options: {
              plugins() {
                return [
                  importCSS(),
                  postcssPresetEnv({
                    stage: 2,
                    browsers: [
                      '> 1%',
                      'last 2 versions',
                      'Firefox ESR',
                      'Opera 12.1',
                      'Safari 7',
                      'ie 9',
                    ],
                    features: {
                      'custom-properties': {
                        importFrom: './src/css/variables.css',
                        preserve: false,
                      },
                    },
                  }),
                  hexrgba(),
                ];
              },
            },
          },
        ],
      },
      {
        test: /\.jsx?$/,
        include: [path.join(__dirname, 'src')],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    modules: false,
                    targets: {
                      browsers: [
                        '> 1%',
                        'last 2 versions',
                        'Firefox ESR',
                        'Opera 12.1',
                        'Safari 7',
                        'ie 9',
                      ],
                    },
                  },
                ],
                '@babel/preset-react',
              ],
              plugins: [
                '@babel/plugin-proposal-class-properties',
                'react-hot-loader/babel',
              ],
            },
          },
          'eslint-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif)(\?[a-z0-9]+)?$/,
        include: [path.join(__dirname, 'src')],
        loader: 'url-loader',
      },
      {
        test: /\.svg$/,
        include: [path.join(__dirname, 'src')],
        issuer: /\.css$/,
        loader: 'url-loader',
      },
      {
        test: /\.svg$/,
        include: [path.join(__dirname, 'src')],
        issuer: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    modules: false,
                    targets: {
                      browsers: [
                        '> 1%',
                        'last 2 versions',
                        'Firefox ESR',
                        'Opera 12.1',
                        'Safari 7',
                        'ie 9',
                      ],
                    },
                  },
                ],
                '@babel/preset-react',
              ],
            },
          },
          {
            loader: 'react-svg-loader',
            options: {
              jsx: true, // true outputs JSX tags
              svgo: {
                plugins: [
                  {
                    removeViewBox: false,
                  },
                ],
                floatPrecision: 2,
              },
            },
          },
        ],
      },
      {
        test: /\.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
        include: [path.join(__dirname, 'src')],
        loader: 'file-loader?name=fonts/[name].[ext]',
      },
      {
        test: /\.(graphql|gql)$/,
        include: [path.join(__dirname, 'src'), path.join(__dirname, 'library')],
        loader: 'graphql-tag/loader',
      },
    ],
  },
  node: {
    fs: 'empty',
  },
  target: 'web',
};
