import q from 'q'
import got from 'got'
import keyBy from 'lodash/keyBy'
import cache from 'memory-cache'

const kPairs = 'BCHEUR,BCHUSD,BCHXBT,DASHEUR,DASHUSD,DASHXBT,EOSETH,EOSXBT,GNOETH,GNOXBT,USDTUSD,ETCETH,ETCXBT,ETCEUR,ETCUSD,ETHXBT,ETHXBT.d,ETHCAD,ETHCAD.d,ETHEUR,ETHEUR.d,ETHGBP,ETHGBP.d,ETHJPY,ETHJPY.d,ETHUSD,ETHUSD.d,ICNETH,ICNXBT,LTCXBT,LTCEUR,LTCUSD,MLNETH,MLNXBT,REPETH,REPXBT,REPEUR,XBTCAD,XBTCAD.d,XBTEUR,XBTEUR.d,XBTGBP,XBTGBP.d,XBTJPY,XBTJPY.d,XBTUSD,XBTUSD.d,XDGXBT,XLMXBT,XMRXBT,XMREUR,XMRUSD,XRPXBT,XRPEUR,XRPUSD,ZECXBT,ZECEUR,ZECUSD'
  .toLowerCase()
  .split(',')

const format = value => {
  const n = Number(value)
  const s = String(value)

  if (n < 0.0001) {
    return `${(n * 1e8).toFixed(0)}s`
  } else if (n < 0.01) {
    return s.substr(0, 7)
  } else if (n >= 100) {
    return n.toFixed(0)
  }

  return s.substr(0, 5)
}

const bittrex = market =>
  got(
    `https://bittrex.com/Api/v2.0/pub/market/GetLatestTick?marketName=${market}&tickInterval=day`,
    { json: true },
  )
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
        timestamp: Date.now(),
      }
    })

const fall = async () => {
  const c = cache.get('crypto-fallback')
  if (c) {
    return q(c)
  }

  const { body } = await got('https://api.coinmarketcap.com/v1/ticker?limit=0')
  const data = keyBy(JSON.parse(body), 'id')

  cache.put('crypto-fallback', data, 1e3 * 20)
  return data
}

export const getLatest = async s => {
  const cached = cache.get(`crypto-${s}`)
  if (cached) {
    return q(cached)
  }

  const notFall = (s !== 'request-network' && s.includes('-')) || kPairs.includes(s)

  if (!notFall) {
    const f = await fall()

    return {
      url: `https://coinmarketcap.com/currencies/${f[s].id}`,
      last: format(f[s].price_btc),
      volume: Number(f[s]['24h_volume_usd']).toLocaleString(),
      timestamp: Date.now(),
    }
  }

  const p = s.includes('-') ? bittrex(s) : kraken(s)
  const data = await p
  cache.put(`crypto-${s}`, data, 1e3 * 30)
  return data
}
