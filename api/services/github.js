import _ from 'lodash'
import q from 'q'
import got from 'got'
import cache from 'memory-cache'
import cheerio from 'cheerio'

import config from '../../config'

export function getTrending (lang) {

  const cached = cache.get(`github-${lang}`)
  if (cached) { return q(cached) }

  let url = 'https://github.com/trending'
  if (lang) { url += `?l=${lang}` }

  return got(url)
    .then(response => {

      const out = []
      const dom = cheerio.load(response.body)

      dom('.repo-list-item')
        .each((i, it) => {
          const item = dom(it)
          const meta = item.find('.repo-list-meta').text().split('•')
          const push = {
            url: item.find('.repo-list-name a')[0].attribs.href,
            desc: item.children('.repo-list-description').text().trim(),
            lang: meta.length !== 3 ? 'None' : meta[0],
            today: meta.length !== 3 ? meta[0] : meta[1]
          }
          push.today = push.today.trim().split(' ')[0]
          push.name = push.url.replace(/.*\/(.*)$/, '$1')

          if (_.includes(config.bannedRepositories, push.name)) { return }
          out.push(push)
        })

      return _.take(out, 15)
    })
    .then(data => {
      cache.put(`github-${lang}`, data, 30e3 * 60)
      return data
    })
}
