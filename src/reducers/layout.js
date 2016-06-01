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
  },

  MOVE_WIDGET: (state, { payload }) => {
    const {
      siblingId,
      widgetId,
      direction,
    } = payload

    if (siblingId === widgetId) { return state }

    const sourceCol = state.cols.find(col => col.indexOf(widgetId) > -1)
    const targetCol = state.cols.find(col => col.indexOf(siblingId) > -1)

    if (sourceCol === targetCol) {

      // handle case we drop in the same column

      const colIndex = state.cols.indexOf(sourceCol)
      const newCol = sourceCol.slice(0)
      const sourceIndex = newCol.indexOf(widgetId)
      newCol.splice(sourceIndex, 1)
      const targetIndex = newCol.indexOf(siblingId)
      const newIndex = direction === 'top'
        ? targetIndex
        : targetIndex + 1
      newCol.splice(newIndex, 0, widgetId)
      const newCols = state.cols.slice(0)
      newCols[colIndex] = newCol
      return {
        ...state,
        cols: newCols
      }
    }

    const sourceColIndex = state.cols.indexOf(sourceCol)
    const targetColIndex = state.cols.indexOf(targetCol)

    const newSourceCol = sourceCol.slice(0)
    const newTargetCol = targetCol.slice(0)

    const sourceIndex = sourceCol.indexOf(widgetId)
    const targetIndex = targetCol.indexOf(siblingId)

    newSourceCol.splice(sourceIndex, 1)

    const newIndex = direction === 'top'
      ? targetIndex
      : targetIndex + 1

    newTargetCol.splice(newIndex, 0, widgetId)

    const newCols = state.cols.slice(0)

    newCols[sourceColIndex] = newSourceCol
    newCols[targetColIndex] = newTargetCol

    return {
      ...state,
      cols: newCols
    }

  }

}, state)
