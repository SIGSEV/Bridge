import { forIn } from 'lodash'

export default function serialize (obj) {
  const str = []

  forIn(obj, (val, key) => {
    str.push(`${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
  })

  return str.join('&')
}
