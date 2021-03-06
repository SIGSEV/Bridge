import { Router } from 'express'

import * as weatherService from '../services/weather'

const router = Router()

router.get('/', (req, res) => {
  weatherService.getByCoords(req.query.lat, req.query.lng)
    .then(data => res.status(200).send(data))
    .catch(({ message }) => res.status(400).send({ message }))
})

export default router
