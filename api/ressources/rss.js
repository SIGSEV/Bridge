import { Router } from 'express'

import { rssService } from '../services'

const router = Router()

router.get('/', (req, res) => {
  rssService.fetch(req.query.feed)
    .then(data => {
      res.status(200).send(data)
    })
    .catch(err => {
      res.status(400).send({ message: err.message })
    })
})

export default router
