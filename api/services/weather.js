import q from 'q'
import got from 'got'
import cache from 'memory-cache'

import config from '../../config'
import icons from '../../src/data/weather'

const baseUrl = 'api.openweathermap.org/data/2.5/weather'

export const getByCoords = (lat, lng) => {
  const cached = cache.get(`weather-${lat}:${lng}`)
  if (cached) { return q(cached) }

  return got(`${baseUrl}?lat=${lat}&lon=${lng}&units=metric&APPID=${config.weatherToken}`, { json: true })
    .then(response => response.body)
    .then(body => {
      const { temp, pressure } = body.main
      const wind = body.wind.speed
      const clouds = body.clouds.all
      const weather = body.weather[0]

      const { id } = weather
      let icon = icons[id].icon

      if (!(id > 699 && id < 800) && !(id > 899 && id < 1000)) {
        icon = `day-${icon}`
      }

      return {
        desc: weather.description,
        icon: `wi wi-${icon}`,
        temp: temp.toFixed(0),
        pressure, wind, clouds
      }

    })
    .then(data => {
      cache.put(`weather-${lat}:${lng}`, data, 10e3 * 60)
      return data
    })
}
