import { handleActions } from 'redux-actions'

import {
  widgetFetch,
  widgetFetched,
  widgetFailed
} from 'actions/widgets'

const state = {

  cols: [
    ['Weather'],
    [],
    ['Github']
  ],

  widgets: {
    Weather: {
      style: {
        width: 250
      },
      loading: true,
      fetch: (dispatch) => {
        dispatch(widgetFetch('Weather'))
        fetch('http://localhost:3001/weather')
          .then(res => res.json())
          .then(data => { dispatch(widgetFetched({ type: 'Weather', data })) })
          .catch(() => { dispatch(widgetFailed('Weather')) })
      }
    },
    Github: {
      style: {
        width: 350,
        height: 500
      },
      loading: true,
      fetch: dispatch => {
        dispatch(widgetFetch('Github'))
        fetch('http://localhost:3001/github/trending?lang=javascript')
          .then(res => res.json())
          .then(data => { dispatch(widgetFetched({ type: 'Github', data })) })
          .catch(() => { dispatch(widgetFailed('Github')) })
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
    const { type, data } = action.payload
    return {
      ...state,
      widgets: {
        ...state.widgets,
        [type]: {
          ...state.widgets[type],
          loading: false,
          data
        }
      }
    }
  },

  WIDGET_FAILED: (state, action) => {
    const type = action.payload
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
