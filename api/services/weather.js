import got from 'got'
import _ from 'lodash'

const baseUrl = 'https://query.yahooapis.com/v1/public/yql'

function fahrenheitToCelsius (temp) {
  if (!temp) { return null }
  return (temp - 32) * (5 / 9)
}

export function getByCity (city) {
  return got(`${baseUrl}?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="${city}")&format=json`, { json: true })
    .then(response => response.body)
    .then(body => {
      if (!_.has(body, 'query.results.channel')) { throw new Error('Invalid response from Yahoo API.') }

      const data = body.query.results.channel
      return {
        astronomy: data.astronomy,
        atmosphere: data.atmosphere,
        condition: {
          celsius: data.item.condition.temp,
          fahrenheit: fahrenheitToCelsius(data.item.condition.temp),
          text: data.item.condition.text
        },
        img: data.item.description.replace(/[\s\S]*<img src=\"([^\"]*)[\s\S]*/, '$1'),
        wind: data.wind
      }
    })
}
