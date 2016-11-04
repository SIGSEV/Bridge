import _ from 'lodash'
import q from 'q'
import got from 'got'
import cache from 'memory-cache'
import cheerio from 'cheerio'

import config from '../../config'

export const getTrending = lang => {

  const cached = cache.get(`github-${lang}`)
  if (cached) { return q(cached) }

  let url = 'https://github.com/trending'
  if (lang) { url += `?l=${lang}` }

  return got(url)
    .then(response => {

      const out = []
      const dom = cheerio.load(response.body)

      dom('.repo-list > li')
        .each((i, it) => {

          const item = dom(it)
          const url = item.find('h3 a')[0].attribs.href
          const name = url.replace(/.*\/(.*)$/, '$1')

          if (_.includes(config.bannedRepositories, name)) { return }

          const desc = item.children('.py-1').text().trim()
          const lang = item.find('[itemprop=programmingLanguage]').text().trim()
          const today = item.find('[aria-label=Stargazers]').text().trim()

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
