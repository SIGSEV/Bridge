import { handleActions } from 'redux-actions'

const state = {

  cols: [
    [],
    ['Weather'],
    []
  ],

  widgets: {

    Weather: {
      style: {
        width: 250,
        height: 194
      },
      url: 'http://localhost:3001/weather'
    },

    Github: {
      style: {
        width: 350,
        height: 300
      },
      url: 'http://localhost:3001/github/trending?lang=javascript'
    },

    StackOverflow: {
      style: {
        width: 350,
        height: 500
      },
      url: 'http://localhost:3001/stack/recent?tag=javascript'
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
          loading: true,
          loaded: false
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
          loaded: true,
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
