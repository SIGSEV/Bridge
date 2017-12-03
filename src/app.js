import React from 'react'
import { render } from 'react-dom'
import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import 'gsap'

import { App } from 'components'
import reducer from 'reducers'
import * as storageService from 'services/storage'

storageService.getData(state => {
  const store = createStore(
    reducer,
    state,
    compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f),
  )

  const root = (
    <Provider store={store}>
      <App />
    </Provider>
  )

  const rootNode = document.getElementById('root')

  render(root, rootNode)
})
