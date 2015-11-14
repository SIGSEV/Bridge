import q from 'q'
import got from 'got'

const baseUrl = 'https://api.stackexchange.com/2.2'

export function getRecentByTag (tag) {

  if (!tag) { return q.reject(new Error('No tag given.')) }

  return got(`${baseUrl}/search?order=desc&sort=activity&site=stackoverflow&tagged=${tag}`, { json: true })
    .then(response => response.body)
}

export function getBountiesByTag (tag) {

  if (!tag) { return q.reject(new Error('No tag given.')) }

  return got(`${baseUrl}https://api.stackexchange.com/2.2/questions/featured?order=desc&sort=activity&site=stackoverflow&tagged=${tag}`)
    .then(response => response.body)
}
