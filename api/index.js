import express from 'express'
import bodyParser from 'body-parser'

import config from '../config'
import * as ressources from './ressources'

const server = express()

server.use(bodyParser.json())
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
  next()
})

server.use('/weather', ressources.weather)
server.use('/bitcoin', ressources.bitcoin)
server.use('/stack', ressources.stack)
server.use('/github', ressources.github)
server.use('/dribbble', ressources.dribbble)
server.use('/rss', ressources.rss)

server.listen(config.port, config.host, err => {
  if (err) { return console.log(err) } // eslint-disable-line no-console
  console.log(`[Bridge API] Listening on port ${config.port}`) // eslint-disable-line no-console
})
