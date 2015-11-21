import { Router } from 'express'

import { stackService } from '../services'

const router = Router()

router.get('/recent', (req, res) => {
  stackService.getRecentByTag(req.query.tag, req.query.site)
    .then(data => {
      res.status(200).send(data)
    })
    .catch(err => {
      res.status(400).send({ message: err.message })
    })
})

export default router
