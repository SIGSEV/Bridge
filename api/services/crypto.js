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
  got(`https://api.cryptowat.ch/markets/kraken/${pair}/summary`, { json: true })
    .then(response => response.body)
    .then(body => {

      const { price: { last, high, low }, volume } = body.result

      return {
        url: `https://cryptowat.ch/kraken/${pair}/30m`,
        high: format(high),
        low: format(low),
        last: format(last),
        volume: Number(volume).toFixed(2),
        timestamp: Date.now()
      }

    })

export const getLatest = pair => {
  const cached = cache.get(`crypto-${pair}`)
  if (cached) { return q(cached) }
  const trPair = pair === 'xbtusd' ? 'btcusd' : pair
  const p = trPair.includes('-') ? bittrex(trPair) : kraken(trPair)

  return p.then(data => {
    cache.put(`crypto-${trPair}`, data, 1e3 * 30)
    return data
  })
}
