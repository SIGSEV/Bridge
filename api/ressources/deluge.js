import { Router } from 'express'

import * as delugeService from '../services/deluge'

const router = Router()

router.get('/', (req, res) => {
  delugeService.fetch(req.query.host, req.query.pass)
    .then(data => res.status(200).send(data))
    .catch(({ message }) => res.status(400).send({ message }))
})

router.post('/', (req, res) => {
  delugeService.upload(req.query.host, req.query.pass, req.body.file)
    .then(data => res.status(200).send(data))
    .catch(({ message }) => res.status(400).send({ message }))
})

export default router
