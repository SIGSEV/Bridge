import ExtractPlugin from 'mini-css-extract-plugin'

import webpackConfig from './config'

export default {
  ...webpackConfig,

  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [ExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      ...webpackConfig.module.rules,
    ],
  },

  plugins: [...webpackConfig.plugins, new ExtractPlugin({ filename: 'styles.css' })],

  optimization: {
    minimize: true,
  },

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
