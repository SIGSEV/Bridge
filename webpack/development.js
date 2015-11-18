import _ from 'lodash'
import path from 'path'
import webpack from 'webpack'

import config from '../config'

export default {

  resolve: {
    modulesDirectories: ['node_modules', 'src'],
  },

  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/app'
  ],

  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },

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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        config: JSON.stringify(_.pick(config, ['api']))
      }
    })
  ],

  devtool: 'sourcemap'

}
