import { Router } from 'express'

import * as insultService from '../services/insults'

const router = Router()

router.get('/', (req, res) => {
  insultService.getOne(req.query.hour)
    .then(txt => res.status(200).send({ txt }))
    .catch(({ message }) => res.status(400).send({ message }))
})

export default router
