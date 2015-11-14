import got from 'got'

const baseUrl = 'https://www.bitstamp.net/api'

export function getLatest () {
  return got(`${baseUrl}/ticker/`, { json: true })
    .then(response => response.body)
    .then(body => {
      return {
        high: body.high,
        low: body.low,
        last: body.last,
        volume: body.volume,
        timestamp: new Date(parseInt(body.timestamp) * 1000)
      }
    })
}
