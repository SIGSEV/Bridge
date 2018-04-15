import { Router } from 'express'

import * as dribbbleService from '../services/dribbble'

const router = Router()

router.get('/', (req, res) => {
  dribbbleService
    .getRandom()
    .then(data => res.status(200).send(data))
    .catch(({ message }) => res.status(400).send({ message }))
})

export default router
