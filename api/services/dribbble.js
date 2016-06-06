import q from 'q'
import got from 'got'
import cache from 'memory-cache'

import config from '../../config'

const baseUrl = 'https://api.dribbble.com/v1'

export const getRandom = () => {
  const cached = cache.get('dribbble')
  if (cached) { return q(cached[Math.floor(Math.random() * 12)]) }

  return got(`${baseUrl}/shots`, {
    headers: { Authorization: `Bearer ${config.dribbbleToken}` }
  })
  .then(response => JSON.parse(response.body))
  .then(data => {
    cache.put('dribbble', data, 1e3 * 60 * 60)
    return data
  })
  .then(shots => shots[Math.floor(Math.random() * 12)])
}
