import q from 'q'
import got from 'got'
import { format } from 'date-fns'
import cache from 'memory-cache'

import config from '../../config'

const baseUrl = `https://api.darksky.net/forecast/${config.weatherToken}`

const getIcon = icon => icon.toUpperCase().replace(/-/g, '_')

export const getByCoords = (lat, lng) => {
  const cached = cache.get(`weather-${lat}:${lng}`)
  if (cached) {
    return q(cached)
  }

  return got(`${baseUrl}/${lat},${lng}?units=si`, { json: true })
    .then(response => response.body)
    .then(data => {
      const { currently, daily } = data

      const projections = daily.data
        .slice(1, 4)
        .map(({ icon, time, temperatureHigh, temperatureLow }) => ({
          icon: getIcon(icon),
          ts: time,
          temperature: ((temperatureHigh - temperatureLow) / 2 + temperatureLow).toFixed(0),
          time: format(time * 1e3, 'ddd'),
        }))

      return {
        icon: getIcon(currently.icon),
        temperature: currently.temperature.toFixed(0),
        projections,
      }
    })
    .then(data => {
      cache.put(`weather-${lat}:${lng}`, data, 10e3 * 60)
      return data
    })
}
