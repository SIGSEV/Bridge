import q from 'q'
import got from 'got'
import cache from 'memory-cache'

const baseUrl = 'https://api.kraken.com/0/public'

export const getLatest = pair => {
  const cached = cache.get(`crypto-${pair}`)
  if (cached) { return q(cached) }

  return got(`${baseUrl}/Ticker?pair=${pair}`, { json: true })
    .then(response => response.body)
    .then(body => {

      const key = Object.keys(body.result)[0]
      const cur = body.result[key]

      return {
        high: Number(cur.h[0]).toFixed(2),
        low: Number(cur.l[0]).toFixed(2),
        last: Number(cur.c[0]).toFixed(2),
        volume: Number(cur.v[0]).toFixed(2),
        timestamp: new Date().getTime()
      }

    })
    .then(data => {
      cache.put('bitcoin', data, 1e3 * 30)
      return data
    })
}
