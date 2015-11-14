import express, { Router } from 'express'
import bodyParser from 'body-parser'

import * as ressources from './ressources'

const server = express()

server.use(bodyParser.json())
server.use('/weather', ressources.weather)
server.use('/bitcoin', ressources.bitcoin)
server.use('/stack', ressources.stack)

const port = process.env.PORT || 3001

server.listen(port, 'localhost', err => {
  if (err) { return console.log(err) }
  console.log(`listening at http://localhost:${port}`)
})
