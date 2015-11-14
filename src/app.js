import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import { App } from 'components'
import reducer from 'reducers'

// TODO: get state from app storage
const state = {}
const store = createStore(reducer, state)

const root = (
  <Provider store={store}>
    <App />
  </Provider>
)

const rootNode = document.getElementById('root')

render(root, rootNode)
