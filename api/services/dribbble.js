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
          const title = el.find('.dribbble-link img')[0].attribs.alt
          const img = el.find('.dribbble-link img')[0].attribs.src.replace(/_teaser\.(.*)$/, '.$1')
          const url = el.find('.dribbble-link')[0].attribs.href
          const username = el
            .find('.attribution-user > a')
            .text()
            .trim()

          const userUrl = el.find('.attribution-user > a')[0].attribs.href

          const likes = el
            .find('.tools li.fav a')
            .last()
            .text()
            .trim()

          return {
            title,
            img,
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
      return data
    })
    .then(shots => shots[Math.floor(Math.random() * 12)])
}
