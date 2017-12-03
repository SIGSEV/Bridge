import { cloneDeep, mapValues, pick } from 'lodash'
import { createAction } from 'redux-actions'

import { setData } from 'services/storage'
import { initialState } from 'reducers/mode'

export function save() {
  return (dispatch, getState) => {
    const copy = cloneDeep(pick(getState(), ['layout', 'geo']))

    // reset global mode state
    copy.mode = initialState

    // reset widgets state
    const widgetKeys = ['type', 'config', 'requires']

    copy.layout.widgets = mapValues(copy.layout.widgets, widget => pick(widget, widgetKeys))

    setData(copy, f => f)
  }
}

export const startDrag = createAction('START_DRAG')
export const stopDrag = createAction('STOP_DRAG')
