import { combineReducers } from 'redux'

import layout from './layout'
import mode from './mode'
import picker from './picker'
import geo from './geo'

export default combineReducers({
  layout,
  mode,
  picker,
  geo,
})
