import { handleActions } from 'redux-actions'

const { api } = process.env.config

const state = {

  cols: [
    [],
    [],
    []
  ,

  widgets: {

    Weather: {
      style: {
        width: 250,
        height: 194
      },
      url: `${api}/weather`
    },

    Github: {
      style: {
        width: 350,
        height: 300
      },
      url: `${api}/github/trending?lang=javascript`
    },

    StackOverflow: {
      style: {
        width: 350,
        height: 500
      },
      url: `${api}/stack/recent?tag=javascript`
    },

    Dribbble: {
      style: {
        width: 250,
        height: 250
      },
      url: `${api}/dribbble`
    },

    Bitcoin: {
      style: {
        width: 200,
        height: 100
      },
      url: `${api}/bitcoin`
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
