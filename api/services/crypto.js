import got from 'got'
import keyBy from 'lodash/keyBy'
import cache from 'memory-cache'

const BASE_URL =
  'https://api.coingecko.com/api/v3/coins/markets?order=market_cap_desc&per_page=250&sparkline=false'

const CURRENCIES = ['btc', 'usd', 'eth']

const wait = ms => new Promise(resolve => setTimeout(resolve, ms))

export const getLatest = async (coin, preferred) => {
  const cached = cache.get('crypto')
  if (cached) {
    const data = cached[preferred][coin]
    return { ...data, usdMc: cached.usd[coin].market_cap, usdVolume: cached.usd[coin].total_volume }
  }

  await wait(200)
  return getLatest(coin, preferred)
}

export const refreshCrypto = async () => {
  const data = (await Promise.all(
    [].concat(
      ...CURRENCIES.map(currency =>
        [...Array(4).keys()].map(i =>
          got(`${BASE_URL}&page=${i + 1}&vs_currency=${currency}`).then(r => ({
            currency,
            data: keyBy(JSON.parse(r.body), 'symbol'),
          })),
        ),
      ),
    ),
  )).reduce((acc, r) => ({ ...acc, [r.currency]: { ...acc[r.currency], ...r.data } }), {})

  cache.put('crypto', data)
}
