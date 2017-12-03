import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

import webpackConfig from './config'

export default {
  ...webpackConfig,

  module: {
    rules: [
      {
        test: /\.s?css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'autoprefixer-loader', 'sass-loader'],
        }),
      },
      ...webpackConfig.module.rules,
    ],
  },

  plugins: [
    ...webpackConfig.plugins,

    // extract styles
    new ExtractTextPlugin('styles.css'),

    new webpack.optimize.UglifyJsPlugin({ compressor: { warnings: false } }),
  ],

  stats: {
    colors: true,
    reasons: false,
    hash: false,
    version: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    cached: false,
    cachedAssets: false,
  },
}
