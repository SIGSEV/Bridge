import got from 'got'
import get from 'lodash/get'
import flatten from 'lodash/flatten'
import cache from 'memory-cache'

const BASE_URL =
  'https://api.coingecko.com/api/v3/coins/markets?order=market_cap_desc&per_page=250&sparkline=true&price_change_percentage=24h,7d'

const CURRENCIES = ['btc', 'eth', 'usd', 'eur']
const PAGES = 5

const wait = ms => new Promise(resolve => setTimeout(resolve, ms))

const getCache = async () => {
  const cached = cache.get('crypto')
  if (cached) {
    return cached
  }

  await wait(200)
  return getCache()
}

export const getLatest = async (coin, preferred) => {
  const cache = await getCache()

  const data = cache[preferred][coin]

  if (!data) {
    return {
      usdMc: 0,
      usdVolume: 0,
    }
  }

  const usdCoin = get(cache, `usd.${coin}`, {})
  const { market_cap, total_volume } = usdCoin

  return { ...data, usdMc: market_cap || 0, usdVolume: total_volume || 0 }
}

const manualFetch = async coins => {
  for (const coin of coins) {
    try {
      const res = await got(
        `https://api.coingecko.com/api/v3/coins/${coin}?sparkline=true`,
      ).then(r => JSON.parse(r.body))

      if (!res) {
        continue
      }

      const base = {
        id: res.id,
        symbol: res.symbol,
        image: res.image.small,
        market_cap: res.market_data.market_cap.usd,
        market_cap_rank: res.market_cap_rank || res.coingecko_rank,
        sparkline_in_7d: res.market_data.sparkline_7d,
      }

      cache.put(`crypto-${coin}`, {
        ...CURRENCIES.reduce((acc, key) => {
          acc[key] = {
            ...base,
            current_price: res.market_data.current_price[key],
            price_change_percentage_24h:
              res.market_data.price_change_percentage_24h_in_currency[key],
          }

          return acc
        }, {}),
      })
    } catch (err) {}
  }
}

export const getPortfolio = async coins => {
  const cached = await getCache()

  await manualFetch(coins.filter(c => !cached.usd[c]))

  const out = coins.reduce((acc, coin) => {
    CURRENCIES.forEach(currency => {
      const data = get(cached, [currency, coin], get(cache.get(`crypto-${coin}`), [currency]))

      if (!data) {
        return
      }

      const {
        id,
        image,
        symbol,
        total_supply,
        market_cap,
        market_cap_rank,
        sparkline_in_7d,

        current_price,
        price_change_percentage_24h,
      } = data

      if (!acc[coin]) {
        acc[coin] = {
          id,
          image,
          symbol,
          sparkline_in_7d,
          total_supply,
          market_cap,
          market_cap_rank,

          prices: {},
        }
      }

      acc[coin].prices[currency] = { current_price, price_change_percentage_24h }
    })

    return acc
  }, {})

  return out
}

export const refreshCrypto = async () => {
  const data = await CURRENCIES.reduce(async (prom, currency) => {
    const acc = await prom

    const pages = await Promise.all(
      [...Array(PAGES).keys()].map(i =>
        got(`${BASE_URL}&page=${i + 1}&vs_currency=${currency}`).then(r => JSON.parse(r.body)),
      ),
    )

    acc[currency] = flatten(pages).reduce((acc, coin) => {
      const keys = [coin.id.replace(/-\d$/, ''), coin.symbol.toLowerCase()]

      keys.forEach(key => {
        if (acc[key]) {
          return
        }

        acc[key] = coin
      })

      return acc
    }, {})

    return acc
  }, Promise.resolve({}))

  cache.put('crypto', data)
}
