import got from 'got'

import config from '../../config'

const baseUrl = 'https://api.dribbble.com/v1'

export function getRandom () {
  return got(`${baseUrl}/shots`, {
    headers: { Authorization: `Bearer ${config.dribbbleToken}` }
  })
  .then(response => JSON.parse(response.body))
  .then(shots => shots[Math.floor(Math.random() * 12)])
}
