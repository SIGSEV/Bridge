import { combineReducers } from 'redux'

export default combineReducers({
  layout: require('./layout'),
  mode: require('./mode')
})
