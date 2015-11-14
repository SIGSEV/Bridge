import _ from 'lodash'

export function getData (callback) {
  if (!chrome || !_.has(chrome, 'storage.sync.get')) { return callback({}) }
  chrome.storage.sync.get(callback)
}
