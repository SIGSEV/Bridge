import { Router } from 'express'

import { dribbbleService } from '../services'

const router = Router()

router.get('/', (req, res) => {
  dribbbleService.getRandom()
    .then(data => {
      res.status(200).send({
        title: data.title,
        usr: data.user.name,
        usrUrl: data.user.html_url,
        img: data.images.hidpi || data.images.normal || data.images.teaser,
        imgUrl: data.html_url
      })
    })
    .catch(err => {
      res.status(400).send({ message: err.message })
    })
})

export default router
