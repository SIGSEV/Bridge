import { handleActions } from 'redux-actions'

const state = {
  picker: false
}

export default handleActions({

  OPEN_PICKER: state => ({ ...state, picker: true }),
  CLOSE_PICKER: state => ({ ...state, picker: false })

}, state)
