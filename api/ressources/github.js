import { Router } from 'express'

import { githubService } from '../services'

const router = Router()

router.get('/trending', (req, res) => {
  githubService.getTrending(req.query.language)
    .then(data => {
      res.status(200).send(data)
    })
    .catch(err => {
      res.status(400).send({ message: err.message })
    })
})

export default router
