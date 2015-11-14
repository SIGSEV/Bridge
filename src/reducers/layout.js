import { handleActions } from 'redux-actions'

import {
  widgetFetch,
  widgetFetched,
  widgetFailed
} from 'actions/widgets'

const state = {

  cols: [
    [
      'Weather'
    ],
    [
      'StackOverflow'
    ],
    [
      'Github'
    ]
  ],

  widgets: {

    Weather: {
      style: {
        width: 250,
        height: 194
      },
      loading: true,
      fetch: (dispatch) => {
        dispatch(widgetFetch('Weather'))
        fetch('http://localhost:3001/weather')
          .then(res => res.json())
          .then(values => { dispatch(widgetFetched({ type: 'Weather', values })) })
          .catch(() => { dispatch(widgetFailed('Weather')) })
      }
    },

    Github: {
      style: {
        width: 350,
        height: 300
      },
      loading: true,
      fetch: dispatch => {
        dispatch(widgetFetch('Github'))
        fetch('http://localhost:3001/github/trending?lang=javascript')
          .then(res => res.json())
          .then(values => { dispatch(widgetFetched({ type: 'Github', values })) })
          .catch(() => { dispatch(widgetFailed('Github')) })
      }
    },

    StackOverflow: {
      style: {
        width: 350,
        height: 500
      },
      loading: true,
      fetch: dispatch => {
        dispatch(widgetFetch('StackOverflow'))
        fetch('http://localhost:3001/stack/recent?tag=javascript')
          .then(res => res.json())
          .then(values => { dispatch(widgetFetched({ type: 'StackOverflow', values })) })
          .catch(() => { dispatch(widgetFailed('StackOverflow')) })
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
    const { type, values } = action.payload
    return {
      ...state,
      widgets: {
        ...state.widgets,
        [type]: {
          ...state.widgets[type],
          loading: false,
          values
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
