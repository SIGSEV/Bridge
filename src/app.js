import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import 'gsap'

import { App } from 'components'
import reducer from 'reducers'

// TODO: get state from app storage
const state = {}

const store = applyMiddleware(
  thunk
)(createStore)(reducer, state)

const root = (
  <Provider store={store}>
    <App />
  </Provider>
)

const rootNode = document.getElementById('root')

render(root, rootNode)
