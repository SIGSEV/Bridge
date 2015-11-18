import { handleActions } from 'redux-actions'
import { generate as shortid } from 'shortid'

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
      cols: newCols
    }
  },

  ADD_WIDGET: (state, action) => {
    const { type, targetCol } = action.payload
    const widget = { type }
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
  }

}, state)
