import { combineReducers } from 'redux'

export default combineReducers({
  data: require('./data'),
  ui: require('./ui')
})
