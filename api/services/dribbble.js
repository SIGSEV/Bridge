import q from 'q'
import got from 'got'
import cache from 'memory-cache'
import cheerio from 'cheerio'

const getThing = (parent, target, key) => {
  const el = parent.find(target)[0]

  if (!el) {
    return null
  }

  if (key === 'text') {
    return el.text().trim()
  }

  return el.attribs[key]
}

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
          const video = getThing(el, 'video', 'src')
          const img = getThing(el, 'img', 'src')

          const title = getThing(el, '.shot-title', 'text')
          const username = getThing(el, '.user-information .display-name', 'text')
          const userUrl = getThing(el, '.user-information a', 'href')
          const url = getThing(el, '.shot-thumbnail-link', 'href')
          const likes = getThing(el, '.js-shot-likes-count', 'text')

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
