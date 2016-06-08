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
    const { config, requires } = widgets[type]
    const widget = { type, config, requires }
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

  WIDGET_CONFIG: (state, { payload: { id, config } }) => ({
    ...state,
    widgets: {
      ...state.widgets,
      [id]: {
        ...state.widgets[id],
        config
      }
    }
  }),

  MOVE_WIDGET: (state, { payload }) => {
    const { targetColIndex, sourceColIndex, widgetId, indexInCol, newIndex } = payload

    const cols = state.cols.slice(0)
    const newSourceCol = state.cols[sourceColIndex].slice(0)
    newSourceCol.splice(indexInCol, 1)

    // Check if same column or no
    if (targetColIndex === sourceColIndex) {
      newSourceCol.splice(newIndex, 0, widgetId)
    } else {
      const newTargetCol = state.cols[targetColIndex].slice(0)
      newTargetCol.splice(newIndex, 0, widgetId)
      cols[targetColIndex] = newTargetCol
    }

    cols[sourceColIndex] = newSourceCol

    return { ...state, cols }
  }

}, state)
