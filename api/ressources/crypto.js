import { Router } from 'express'

import * as cryptoService from '../services/crypto'

const router = Router()

router.get('/', (req, res) => {
  cryptoService.getLatest(req.query.coin)
    .then(data => res.status(200).send(data))
    .catch(({ message }) => res.status(400).send({ message }))
})

export default router
