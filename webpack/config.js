import path from 'path'
import { pick } from 'lodash'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import config from '../config'

const env = process.env.NODE_ENV || 'development'
const publicConfigKeys = ['api']

export default {

  resolve: {
    modulesDirectories: ['node_modules', 'src']
  },

  entry: [
    './src/app'
  ],

  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'bundle.js'
  },

  loaders: [{
    test: /\.css$/,
    loaders: ['style', 'css']
  }, {
    test: /\.(woff)$/,
    loader: 'file'
  }],

  plugins: [

    new HtmlWebpackPlugin({
      template: 'templates/index.html'
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env),
        config: JSON.stringify(pick(config, publicConfigKeys))
      }
    })

  ]

}
