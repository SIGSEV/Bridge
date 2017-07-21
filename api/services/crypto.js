import q from 'q'
import got from 'got'
import cache from 'memory-cache'

const bittrex = market =>
  got(`https://bittrex.com/Api/v2.0/pub/market/GetLatestTick?marketName=${market}&tickInterval=oneMin`, { json: true })
    .then(response => response.body)
    .then(body => {
      const data = body.result[0]
      return {
        high: data.H,
        low: data.L,
        last: data.C,
        volume: data.V,
        timestamp: Date.now(),
      }
    })

const kraken = pair =>
  got(`https://api.kraken.com/0/public/Ticker?pair=${pair}`, { json: true })
    .then(response => response.body)
    .then(body => {

      const key = Object.keys(body.result)[0]
      const cur = body.result[key]

      return {
        high: Number(cur.h[0]).toFixed(2),
        low: Number(cur.l[0]).toFixed(2),
        last: Number(cur.c[0]).toFixed(2),
        volume: Number(cur.v[0]).toFixed(2),
        timestamp: Date.now()
      }

    })

export const getLatest = pair => {
  const cached = cache.get(`crypto-${pair}`)
  if (cached) { return q(cached) }
  const p = pair.includes('-') ? bittrex(pair) : kraken(pair)

  return p.then(data => {
    cache.put(`crypto-${pair}`, data, 1e3 * 30)
    return data
  })
}
