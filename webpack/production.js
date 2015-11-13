import path from 'path'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

export default {

  resolve: {
    modulesDirectories: ['node_modules', 'src'],
  },

  entry: [
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
      loaders: ['babel'],
      exclude: /node_modules/
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style', 'css!sass'),
      exclude: /node_modules/
    }]
  },

  plugins: [

    // env variables
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),

    // extract styles
    new ExtractTextPlugin('styles.css'),

    // optimizations
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({ compressor: { warnings: false } })

  ],

  progress: true,

  stats: {
    colors: true,
    reasons: false,
    hash: false,
    version: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    cached: false,
    cachedAssets: false
  }

}
