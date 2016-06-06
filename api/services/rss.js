import _ from 'lodash'
import moment from 'moment'
import got from 'got'

const baseUrl = 'https://ajax.googleapis.com/ajax/services/feed/load?v=2.0&q='

export const fetch = feedUrl => {
  return got(`${baseUrl}${feedUrl}`, { json: true })
    .then(response => response.body)
    .then(body => {
      if (body.responseStatus !== 200) { throw new Error(body.responseDetails) }
      const { feed } = body.responseData
      return {
        title: feed.title,
        entries: _.map(feed.entries, entry => {
          entry.publishedDate = moment(new Date(entry.publishedDate)).format('HH:mm DD/MM/YYYY')
          return _.omit(entry, ['content'])
        })
      }
    })
}
