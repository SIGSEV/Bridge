import q from 'q'
import _ from 'lodash'
import got from 'got'

const baseUrl = 'https://api.stackexchange.com/2.2'

export function getRecentByTag (tag, site = 'stackoverflow') {

  if (!tag) { return q.reject(new Error('No tag given.')) }

  return got(`${baseUrl}/search?order=desc&sort=activity&site=${site}&tagged=${tag}&pagesize=10`, { json: true })
    .then(response => response.body)
    .then(data => {
      return {
        type: data.type,
        items: data.items.map(item => _.pick(item, ['link', 'score', 'view_count', 'title', 'tags']))
      }
    })
}
