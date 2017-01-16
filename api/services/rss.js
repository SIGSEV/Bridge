import moment from 'moment'
import got from 'got'

const baseUrl = 'https://api.rss2json.com/v1/api.json?rss_url='

export const fetch = feedUrl =>
  got(`${baseUrl}${feedUrl}`, { json: true })
    .then(response => response.body)
    .then(body => {

      const { status, feed, items } = body
      if (status !== 'ok') { throw new Error('Invalid response') }

      return {
        title: feed.title,
        entries: items.map(({ link, author, title, pubDate }) => ({
          author,
          title,
          link: link.split('url=')[1],
          pubDate: moment(new Date(pubDate)).format('HH:mm DD/MM/YYYY')
        }))
      }
    })
