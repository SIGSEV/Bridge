import { Router } from 'express'

import * as bitcoinService from '../services/bitcoin'

const router = Router()

router.get('/', (req, res) => {
  bitcoinService.getLatest()
    .then(data => res.status(200).send(data))
    .catch(({ message }) => res.status(400).send({ message }))
})

export default router
