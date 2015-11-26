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
    const { url } = widgets[type]

    function doFetch (newConfig) {
      return fetch(`${api}${url}?${serialize(newConfig || config)}`)
        .then(checkStatus)
        .then(res => res.json())
        .then(values => {
          dispatch(widgetFetched({ id, values }))
          dispatch(save())
        })
        .catch(() => { dispatch(widgetFailed(id)) })
    }

    if (type === 'Weather') {
      return navigator.geolocation.getCurrentPosition(pos => {
        const { latitude, longitude } = pos.coords
        doFetch({ latitude, longitude })
      }, () => {
        dispatch(widgetFailed(id))
      })
    }

    doFetch()

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
