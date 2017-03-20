import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'

import config from '../config'
import * as ressources from './ressources'

const server = express()

server.use(bodyParser.json())

morgan.token('url', req => req.originalUrl.split('?')[0])
server.use(morgan('dev'))

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
  next()
})

Object.keys(ressources).forEach(key => server.use(`/${key}`, ressources[key]))

server.listen(config.port, config.host, err => {
  if (err) { return console.log(err) } // eslint-disable-line no-console
  console.log(`[Bridge API] Listening on port ${config.port}`) // eslint-disable-line no-console
})
