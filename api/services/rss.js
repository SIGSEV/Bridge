import { parseURL } from 'rss-parser'
import moment from 'moment'

export const fetch = feedUrl =>
  new Promise((resolve, reject) => {
    parseURL(feedUrl, (err, body) => {
      if (err) {
        return reject(err)
      }

      const { feed } = body

      const entries = feed.entries.map(entry => {
        return {
          ...entry,
          comments: entry.comments,
          pubDate: moment(new Date(entry.isoDate)).format('HH:mm DD/MM/YYYY'),
        }
      })

      resolve({ ...feed, entries })
    })
  })
