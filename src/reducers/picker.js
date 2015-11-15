import { handleActions } from 'redux-actions'

const state = {
  open: false,
  targetCol: 0
}

export default handleActions({

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
