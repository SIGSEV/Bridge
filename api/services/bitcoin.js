import q from 'q'
import got from 'got'
import cache from 'memory-cache'

const baseUrl = 'https://www.bitstamp.net/api'

export function getLatest () {
  const cached = cache.get('bitcoin')
  if (cached) { return q(cached) }

  return got(`${baseUrl}/ticker/`, { json: true })
    .then(response => response.body)
    .then(body => {
      return {
        high: body.high,
        low: body.low,
        last: body.last,
        volume: body.volume,
        timestamp: new Date(parseInt(body.timestamp, 10) * 1000)
      }
    })
    .then(data => {
      cache.put('bitcoin', data, 5e3 * 60)
      return data
    })
}
