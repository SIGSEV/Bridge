import { omit } from 'lodash'
import { handleActions } from 'redux-actions'
import { generate as shortid } from 'shortid'

import widgets from 'widgets'

const state = {

  cols: [
    [],
    [],
    []
  ],

  widgets: {
  }

}

export default handleActions({

  WIDGET_FETCH: (state, action) => {
    const id = action.payload
    return {
      ...state,
      widgets: {
        ...state.widgets,
        [id]: {
          ...state.widgets[id],
          loading: true,
          loaded: false
        }
      }
    }
  },

  WIDGET_FETCHED: (state, action) => {
    const { id, values } = action.payload

    return {
      ...state,
      widgets: {
        ...state.widgets,
        [id]: {
          ...state.widgets[id],
          loading: false,
          loaded: true,
          lastFetch: Date.now(),
          values
        }
      }
    }
  },

  WIDGET_FAILED: (state, action) => {
    const id = action.payload

    return {
      ...state,
      widgets: {
        ...state.widgets,
        [id]: {
          ...state.widgets[id],
          loading: false,
          loaded: false
        }
      }
    }
  },

  REMOVE_WIDGET: (state, action) => {
    const id = action.payload
    const newCols = state.cols
      .map(widgets => widgets.filter(widgetId => widgetId !== id))
    return {
      ...state,
      widgets: omit(state.widgets, id),
      cols: newCols
    }
  },

  ADD_WIDGET: (state, action) => {
    const { type, targetCol } = action.payload
    const { config } = widgets[type]
    const widget = { type, config }
    const id = shortid()
    return {
      ...state,
      cols: state.cols.map((col, i) => {
        if (i === targetCol) {
          col.push(id)
        }
        return col
      }),
      widgets: {
        ...state.widgets,
        [id]: widget
      }
    }
  },

  WIDGET_CONFIG: (state, action) => {
    const { id, config } = action.payload
    return {
      ...state,
      widgets: {
        ...state.widgets,
        [id]: {
          ...state.widgets[id],
          config
        }
      }
    }
  }

}, state)
