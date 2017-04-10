import q from 'q'
import got from 'got'
import cache from 'memory-cache'

import config from '../../config'

const baseUrl = `https://api.darksky.net/forecast/${config.weatherToken}`

export const getByCoords = (lat, lng) => {
  const cached = cache.get(`weather-${lat}:${lng}`)
  if (cached) { return q(cached) }

  return got(`${baseUrl}/${lat},${lng}`, { json: true })
    .then(response => response.body.currently)
    .then(data => ({
      ...data,
      icon: data.icon.toUpperCase().replace('-', '_'),
      temperature: ((data.temperature - 32) * 5 / 9).toFixed(0),
    }))
    .then(data => {
      cache.put(`weather-${lat}:${lng}`, data, 10e3 * 60)
      return data
    })
}
