import { Router } from 'express'

import { bitcoinService } from '../services'

const router = Router()

router.get('/', (req, res) => {
  bitcoinService.getLatest()
    .then(data => {
      res.status(200).send(data)
    })
    .catch(err => {
      res.status(400).send({ message: err.message })
    })
})

export default router
