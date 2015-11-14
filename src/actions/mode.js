import { createAction } from 'redux-actions'

export const setMode = createAction('SET_MODE', mode => mode)

export function toggleEditMode () {
  return (dispatch, getState) => {
    const { mode } = getState()

    if (mode === 'edit') {
      dispatch(setMode('view'))
    } else {
      dispatch(setMode('edit'))
    }
  }
}
