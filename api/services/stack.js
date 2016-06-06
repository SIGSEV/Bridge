import q from 'q'
import _ from 'lodash'
import got from 'got'
import cache from 'memory-cache'

const baseUrl = 'https://api.stackexchange.com/2.2'

export const getRecentByTag = (tag, site = 'stackoverflow') => {

  if (!tag) { return q.reject(new Error('No tag given.')) }
  const cached = cache.get(`se-${tag}:${site}`)
  if (cached) { return q(cached) }

  return got(`${baseUrl}/search?order=desc&sort=activity&site=${site}&tagged=${tag}&pagesize=10`, { json: true })
    .then(response => response.body)
    .then(data => {
      return {
        type: data.type,
        items: data.items.map(item => _.pick(item, ['link', 'score', 'view_count', 'title', 'tags']))
      }
    })
    .then(data => {
      cache.put(`se-${tag}:${site}`, data, 10e3 * 60)
      return data
    })
}
