import { createAction } from 'redux-actions'

import serialize from 'helpers/serialize'
import checkStatus from 'helpers/check-status'
import { save } from 'actions/global'
import widgets from 'widgets'

const { api } = process.env.config

export const widgetFetch = createAction('WIDGET_FETCH')
export const widgetFetched = createAction('WIDGET_FETCHED')
export const widgetFailed = createAction('WIDGET_FAILED')

export const removeWidget = createAction('REMOVE_WIDGET')
export const addWidget = createAction('ADD_WIDGET')

export function fetchWidget (id) {
  return (dispatch, getState) => {

    dispatch(widgetFetch(id))

    const state = getState()
    const widget = state.layout.widgets[id]
    const { config, type } = widget
    const component = widgets[type]

    if (!component || !component.url) {
      dispatch(widgetFetched({ id }))
      return dispatch(save())
    }

    function doFetch (newConfig) {
      return fetch(`${api}${component.url}?${serialize(newConfig || config)}`)
        .then(checkStatus)
        .then(res => res.json())
        .then(values => {
          dispatch(widgetFetched({ id, values }))
          dispatch(save())
        })
        .catch(() => dispatch(widgetFailed(id)))
    }

    if (type === 'Weather') {
      return navigator.geolocation.getCurrentPosition(pos => {
        const { latitude, longitude } = pos.coords
        const lat = latitude.toFixed(3)
        const lng = longitude.toFixed(3)
        doFetch({ lat, lng })
      }, () => {
        dispatch(widgetFailed(id))
      })
    }

    const conf = {}

    if (type === 'Motivation') {
      conf.hour = new Date().getHours()
    }

    doFetch(type === 'Motivation' ? conf : null)

  }
}

const widgetConfig = createAction('WIDGET_CONFIG')

export function configWidget (payload) {
  return (dispatch) => {
    const { id, config } = payload
    dispatch(widgetConfig({ id, config }))
    dispatch(save())
    dispatch(fetchWidget(id))
  }
}

const widgetMoved = createAction('MOVE_WIDGET')

export const moveWidget = payload => dispatch => {
  dispatch(widgetMoved(payload))
  dispatch(save())
}
