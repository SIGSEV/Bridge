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
      fetch: (dispatch) => {
        dispatch(widgetFetch('Weather'))
        fetch('http://localhost:3001/weather')
					.then(checkStatus)
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
      fetch: dispatch => {
        dispatch(widgetFetch('Github'))
        fetch('http://localhost:3001/github/trending?lang=javascript')
					.then(checkStatus)
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
      fetch: dispatch => {
        dispatch(widgetFetch('StackOverflow'))
        fetch('http://localhost:3001/stack/recent?tag=javascript')
					.then(checkStatus)
          .then(res => res.json())
          .then(values => { dispatch(widgetFetched({ type: 'StackOverflow', values })) })
          .catch(() => {
            console.log('PUTE')
            dispatch(widgetFailed('StackOverflow'))
          })
      }
    }

  }
}

function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  const error = new Error(response.statusText)
  error.response = response
  throw error
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
          loading: true,
          loaded: false
        }
      }
    }
  },

  WIDGET_FETCHED: (state, action) => {
    const { type, values } = action.payload
    console.log('FETCHED')
    return {
      ...state,
      widgets: {
        ...state.widgets,
        [type]: {
          ...state.widgets[type],
          loading: false,
          loaded: true,
          values
        }
      }
    }
  },

  WIDGET_FAILED: (state, action) => {
    const type = action.payload

    console.log('FAILED')
    return {
      ...state,
      widgets: {
        ...state.widgets,
        [type]: {
          ...state.widgets[type],
          loading: false,
          loaded: false
        }
      }
    }
  },

  REMOVE_WIDGET: (state, action) => {
    const type = action.payload
    const newCols = state.cols
      .map(widgets => widgets.filter(item => item !== type))
    return {
      ...state,
      cols: newCols
    }
  },

  ADD_WIDGET: (state, action) => {
    const { type, targetCol } = action.payload
    return {
      ...state,
      cols: state.cols.map((widgets, i) => {
        widgets = widgets.filter(item => item !== type)
        if (i === targetCol) {
          widgets.push(type)
        }
        return widgets
      })
    }
  }

}, state)
