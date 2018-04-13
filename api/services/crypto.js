import q from 'q'
import got from 'got'
import keyBy from 'lodash/keyBy'
import cache from 'memory-cache'

const getTickers = async () => {
  const c = cache.get('crypto')
  if (c) {
    return q(c)
  }

  const { body } = await got('https://api.coinmarketcap.com/v1/ticker/?convert=eth')
  const data = keyBy(JSON.parse(body), 'id')

  cache.put('crypto', data, 1e3 * 20)
  return data
}

export const getLatest = async s => {
  const f = await getTickers()

  return {
    url: `https://coinmarketcap.com/currencies/${f[s].id}`,
    timestamp: Date.now(),
    ...f[s],
  }
}
