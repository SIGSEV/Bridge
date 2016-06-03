import { createAction } from 'redux-actions'

export const setStatus = createAction('SET_STATUS', status => status)

export const toggleEditMode = () => (dispatch, getState) => {
  const { mode: { status, locked } } = getState()

  if (locked) { return }

  dispatch(setStatus(status === 'edit' ? 'view' : 'edit'))
}

export const toggleLock = createAction('TOGGLE_LOCK', lock => lock)
