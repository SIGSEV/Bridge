import { createAction } from 'redux-actions'

export const openPicker = createAction('OPEN_PICKER')
export const closePicker = createAction('CLOSE_PICKER')

export function togglePicker () {
  return (dispatch, getState) => {
    const { picker } = getState().ui
    const method = (picker)
      ? closePicker
      : openPicker
    dispatch(method())
  }
}
