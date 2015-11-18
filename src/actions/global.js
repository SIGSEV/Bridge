import { cloneDeep, mapValues, pick } from 'lodash'
import { setData } from 'services/storage'

export function save () {
  return (dispatch, getState) => {
    const copy = cloneDeep(getState())

    // reset global state
    copy.mode = 'view'
    copy.picker.open = false

    // reset widgets state
    copy.layout.widgets = mapValues(
      copy.layout.widgets,
      (widget) => { return pick(widget, ['type']) }
    )

    setData(copy, () => {})
  }
}
