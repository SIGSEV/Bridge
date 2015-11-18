import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'

import config from '../webpack/development'

const port = 3000
const devConfig = {
  noInfo: true,
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}

new WebpackDevServer(webpack(config), devConfig)
  .listen(port, 'localhost', err => {
    if (err) { console.log(err) }
    console.log('Listening at localhost:3000')
  })
