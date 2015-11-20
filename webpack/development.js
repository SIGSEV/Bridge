import webpack from 'webpack'

import webpackConfig from './config'

export default {

  ...webpackConfig,

  devtool: 'sourcemap',

  entry: [
    ...webpackConfig.entry,
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server'
  ],

  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      exclude: /node_modules/
    }, {
      test: /\.scss$/,
      loaders: ['style', 'css', 'autoprefixer', 'sass'],
      exclude: /node_modules/
    }]
  },

  plugins: [
    ...webpackConfig.plugins,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]

}
