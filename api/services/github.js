import _ from 'lodash'
import q from 'q'
import got from 'got'
import cache from 'memory-cache'
import cheerio from 'cheerio'

import config from '../../config'

export const getTrending = lang => {
  const cached = cache.get(`github-${lang}`)
  if (cached) {
    return q(cached)
  }

  const url = `https://github.com/trending${lang && lang !== 'null' ? `/${lang}` : ''}`

  return got(url)
    .then(response => {
      const out = []
      const dom = cheerio.load(response.body)

      dom('article.Box-row').each((i, it) => {
        const item = dom(it)
        const url = item.find('h1 a')[0].attribs.href
        const name = url.replace(/.*\/(.*)$/, '$1')

        if (_.includes(config.bannedRepositories, name)) {
          return
        }

        const desc = item
          .children('p.text-gray')
          .text()
          .trim()
        const lang = item
          .find('[itemprop=programmingLanguage]')
          .text()
          .trim()
        const today = item
          .find('span.float-sm-right')
          .text()
          .trim()
          .split(' ')[0]

        const push = { url, name, desc, lang, today }
        out.push(push)
      })

      return _.take(out, 15)
    })
    .then(data => {
      cache.put(`github-${lang}`, data, 30e3 * 60)
      return data
    })
}
