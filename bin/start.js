import webpack from 'webpack'
import webpackDevServer from 'webpack-dev-server'

import config from '../webpack/development'

const compiler = webpack(config)
const server = new webpackDevServer(compiler)

server.listen(3000)
