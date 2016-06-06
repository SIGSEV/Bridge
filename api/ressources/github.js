import { Router } from 'express'

import * as githubService from '../services/github'

const router = Router()

router.get('/trending', (req, res) => {
  githubService.getTrending(req.query.language)
    .then(data => res.status(200).send(data))
    .catch(({ message }) => res.status(400).send({ message }))
})

export default router
