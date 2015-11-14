import { handleActions } from 'redux-actions'
import got from 'got'

import {
  widgetFetch,
  widgetFetched,
  widgetFailed
} from 'actions/widgets'

const state = {

  cols: [
    ['Weather'],
    [],
    []
  ],

  widgets: {
    Weather: {
      loading: false,
      fetch: (dispatch) => {
        dispatch(widgetFetch('Weather'))
        got('localhost:3001/weather', { retries: 0 })
          .then(res => res.body)
          .then(data => { dispatch(widgetFetched({ id: 'Weather', data })) })
          .catch(() => { dispatch(widgetFailed('Weather')) })
      }
    }
  }
}

export default handleActions({

  WIDGET_FETCH: (state, action) => {
    const type = action.payload
    return {
      ...state,
      widgets: {
        ...state.widgets,
        [type]: {
          ...state.widgets[type],
          loading: true
        }
      }
    }
  },

  WIDGET_FETCHED: (state, action) => {
    const { type } = action.payload
    return {
      ...state,
      widgets: {
        ...state.widgets,
        [type]: {
          ...state.widgets[type],
          loading: false
        }
      }
    }
  },

  WIDGET_FAILED: (state, action) => {
    const type = action.payload
    console.log(action.payload)
    return {
      ...state,
      widgets: {
        ...state.widgets,
        [type]: {
          ...state.widgets[type],
          loading: false
        }
      }
    }
  }

}, state)
