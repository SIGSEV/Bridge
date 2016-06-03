import { handleActions } from 'redux-actions'

const state = {
  status: 'view',
  locked: false
}

export default handleActions({

  SET_STATUS: (state, { payload: status }) => ({ ...state, status }),
  TOGGLE_LOCK: (state, { payload: locked }) => ({ ...state, locked })

}, state)
