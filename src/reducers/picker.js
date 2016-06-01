import { handleActions } from 'redux-actions'

const state = {
  drag: false,
  open: false,
  targetCol: 0
}

export default handleActions({

  START_DRAG: (state, action) => ({ ...state, drag: action.payload }),
  STOP_DRAG: state => ({ ...state, drag: false }),

  OPEN_PICKER: (state, action) => ({
    ...state,
    open: true,
    targetCol: action.payload
  }),

  CLOSE_PICKER: (state) => ({
    ...state,
    open: false
  })

}, state)
