import { cloneDeep, mapValues, pick } from 'lodash'
import { createAction } from 'redux-actions'
import { setData } from 'services/storage'

export function save () {
  return (dispatch, getState) => {
    const copy = cloneDeep(pick(getState(), [
      'layout'
    ]))

    // reset global state
    copy.mode = 'view'

    // reset widgets state
    const widgetKeys = [
      'type',
      'config',
      'requires'
    ]

    copy.layout.widgets = mapValues(
      copy.layout.widgets,
      (widget) => { return pick(widget, widgetKeys) }
    )

    setData(copy, () => {})
  }
}

export const startDrag = createAction('START_DRAG')
export const stopDrag = createAction('STOP_DRAG')
