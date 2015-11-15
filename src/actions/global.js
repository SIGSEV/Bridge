import { cloneDeep } from 'lodash'
import { setData } from 'services/storage'

export function save () {
  return (dispatch, getState) => {
    const copy = cloneDeep(getState())

    // reset state
    copy.mode = 'view'
    copy.picker.open = false

    setData(copy, () => {
      console.log('saved')
    })
  }
}
