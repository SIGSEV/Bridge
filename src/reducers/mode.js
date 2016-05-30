import { handleActions } from 'redux-actions'

const state = 'view'

export default handleActions({

  SET_MODE: (state, { payload: mode }) => mode,
  SET_EDIT_MODE: () => 'edit',
  SET_VIEW_MODE: () => 'view'

}, state)
