import { createAction } from 'redux-actions'
import get from 'lodash/get'

import serialize from 'helpers/serialize'
import checkStatus from 'helpers/check-status'
import { save } from 'actions/global'
import { toggleLock } from 'actions/mode'
import widgets from 'widgets'

const { api } = process.env.config

export const widgetFetch = createAction('WIDGET_FETCH')
export const widgetFetched = createAction('WIDGET_FETCHED')
export const widgetFailed = createAction('WIDGET_FAILED')

export const removeWidget = createAction('REMOVE_WIDGET')
export const addWidget = createAction('ADD_WIDGET')

const setGeo = createAction('SET_GEO')

export function fetchWidget(id) {
  return (dispatch, getState) => {
    dispatch(widgetFetch(id))

    const state = getState()
    const { geo } = state
    const widget = state.layout.widgets[id]
    const { config, type } = widget
    const component = widgets[type]

    if (!component || !component.url) {
      dispatch(widgetFetched({ id }))
      return dispatch(save())
    }

    const doFetch = newConfig =>
      fetch(`${api}${component.url}?${serialize(newConfig || config)}`)
        .then(checkStatus)
        .then(res => res.json())
        .then(values => {
          dispatch(widgetFetched({ id, values, fetchedWith: newConfig || config }))
          dispatch(save())
        })
        .catch(() => dispatch(widgetFailed(id)))

    if (type === 'Weather') {
      // 1 hour geolocation cache
      if (geo.gotAt && Date.now() - geo.gotAt < 60e3 * 60) {
        const { lat, lng } = geo
        return doFetch({ lat, lng })
      }

      return navigator.geolocation.getCurrentPosition(
        pos => {
          const { latitude, longitude } = pos.coords
          const lat = latitude.toFixed(3)
          const lng = longitude.toFixed(3)
          dispatch(setGeo({ lat, lng }))
          doFetch({ lat, lng })
        },
        () => {
          dispatch(widgetFailed(id))
        },
        { maximumAge: 60e3 * 60 * 5 },
      )
    }

    if (type === 'Portfolio') {
      return doFetch({
        coins: get(config, 'folio', [])
          .map(f => f.name)
          .join(','),
      })
    }

    doFetch()
  }
}

const widgetConfig = createAction('WIDGET_CONFIG')

export function configWidget(payload) {
  return (dispatch, getState) => {
    const { id, config } = payload
    const state = getState()
    const widget = state.layout.widgets[id]

    dispatch(widgetConfig({ id, config }))
    dispatch(save())

    if (
      widget.type !== 'Portfolio' ||
      (widget.config.folioCurrency === config.folioCurrency &&
        widget.config.privacy === config.privacy)
    ) {
      dispatch(fetchWidget(id))
    }

    dispatch(toggleLock(false))
  }
}

const widgetMoved = createAction('MOVE_WIDGET')

export const moveWidget = payload => dispatch => {
  dispatch(widgetMoved(payload))
  dispatch(save())
}

export const uploadFiles = (files, config) =>
  files.forEach(file => {
    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = () => {
      const file = reader.result.replace('data:application/octet-stream;base64,', '')

      fetch(`${api}/deluge?${serialize(config)}`, {
        method: 'post',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ file }),
      })
    }
  })
