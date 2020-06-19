import q from 'q'
import got from 'got'
import cache from 'memory-cache'
import cheerio from 'cheerio'

export const getRandom = () => {
  const cached = cache.get('dribbble')
  if (cached) {
    return q(cached[Math.floor(Math.random() * 12)])
  }

  return got('https://dribbble.com/shots')
    .then(response => {
      const dom = cheerio.load(response.body)

      return dom('ol.dribbbles > li')
        .map((i, e) => {
          const el = dom(e)
          const video = el.find('video')[0].attribs.src
          const img = el.find('img')[0].attribs.src

          const title = el.find('.shot-title')[0].text().trim()
          const username = el.find('.user-information .display-name')[0].text().trim()
          const userUrl = el.find('.user-information a')[0].attribs.href
          const url = el.find('.shot-thumbnail-link')[0].attribs.href

          const likes = el.find('.js-shot-likes-count').last().text().trim()

          return {
            title,
            img,
            video,
            url,
            username,
            userUrl,
            likes,
          }
        })
        .get()
    })
    .then(data => {
      cache.put('dribbble', data, 1e3 * 60 * 60)
      return getRandom()
    })
}
