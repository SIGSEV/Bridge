import { Router } from 'express'

import * as rssService from '../services/rss'

const router = Router()

router.get('/', (req, res) => {
  rssService.fetch(req.query.feed)
    .then(data => res.status(200).send(data))
    .catch(({ message }) => res.status(400).send({ message }))
})

export default router
