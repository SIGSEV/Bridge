import _ from 'lodash'

const hasChromeStorage = chrome && _.has(chrome, 'storage.sync.get')

const getMethod = (hasChromeStorage)
  ? (done) => {
    chrome.storage.sync.get(done)
  }
  : (done) => {
    let data
    try {
      data = JSON.parse(localStorage.getItem('state'))
    } catch (e) { return done() }
    done(data || undefined)
  }

const setMethod = (hasChromeStorage)
  ? (data, done) => {
    chrome.storage.sync.set(data, done)
  }
  : (data, done) => {
    done(localStorage.setItem('state', JSON.stringify(data)))
  }

export function getData (done) {
  getMethod(done)
}

export function setData (data, done) {
  setMethod(data, done)
}
