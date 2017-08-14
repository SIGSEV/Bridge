import q from 'q'
import got from 'got'
import cache from 'memory-cache'

const format = value => {
  const n = Number(value)
  const s = String(value)

  if (n < 0.0001) {
    return `${(n * 1E8).toFixed(0)}s`
  } else if (n < 0.01) {
    return s.substr(0, 7)
  } else if (n >= 100) {
    return n.toFixed(0)
  }

  return s.substr(0, 5)
}

const bittrex = market =>
  got(`https://bittrex.com/Api/v2.0/pub/market/GetLatestTick?marketName=${market}&tickInterval=day`, { json: true })
    .then(response => response.body)
    .then(body => {
      const data = body.result[0]
      return {
        url: `https://bittrex.com/Market/Index?MarketName=${market}`,
        high: format(data.H),
        low: format(data.L),
        last: format(data.C),
        volume: Number(data.V).toFixed(2),
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
        url: `https://cryptowat.ch/kraken/${pair === 'xbtusd' ? 'btcusd' : pair}/30m`,
        high: format(cur.h[0]),
        low: format(cur.l[0]),
        last: format(cur.c[0]),
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
