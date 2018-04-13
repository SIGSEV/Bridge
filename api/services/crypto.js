import q from 'q'
import got from 'got'
import keyBy from 'lodash/keyBy'
import cache from 'memory-cache'

let resolving = false

const wait = ms => new Promise(resolve => setTimeout(resolve, ms))

export const getLatest = async coin => {
  const cached = cache.get('crypto')
  if (cached) {
    return q(cached[coin])
  }

  if (resolving) {
    await wait(200)
    return getLatest(coin)
  }

  resolving = true

  const { body } = await got('https://api.coinmarketcap.com/v1/ticker/?convert=eth&limit=0')
  const data = keyBy(JSON.parse(body), 'id')

  cache.put('crypto', data, 1e3 * 30)

  resolving = false

  return data[coin]
}
