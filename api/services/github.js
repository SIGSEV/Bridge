import got from 'got'
import cheerio from 'cheerio'

export function getTrending (lang) {

  let url = 'https://github.com/trending'
  if (lang) { url += `?l=${lang}` }

  return got(url)
    .then(response => {

      const out = []

      const dom = cheerio.load(response.body)
      dom('.repo-list-item')
        .each((i, it) => {
          const item = dom(it)
          const push = {
            url: item.find('.repo-list-name a')[0].attribs.href,
            desc: item.children('.repo-list-description').text().trim(),
            lang: item.find('.repo-list-meta').text().split('•')[0].trim(),
            today: item.find('.repo-list-meta').text().split('•')[1].trim().split(' ')[0]
          }
          push.name = push.url.replace(/.*\/(.*)$/, '$1')
          out.push(push)
        })

      return out
    })
}
