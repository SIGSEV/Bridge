import React, { Component } from 'react'
import ReactTransitionGroup from 'react/lib/ReactTransitionGroup'
import { connect } from 'react-redux'

import 'styles/app.scss'

import { Picker } from 'components'
import { togglePicker } from 'actions'

@connect(
  state => ({
    picker: state.ui.picker
  })
)
class App extends Component {

  _togglePicker () {
    this.props.dispatch(togglePicker())
  }

  render () {
    const { picker } = this.props
    const toggleIcon = (picker)
      ? 'ion-checkmark'
      : 'ion-grid'
    return (
      <div className='App'>

        <ReactTransitionGroup>

          {picker && (
            <Picker />
          )}

        </ReactTransitionGroup>

        <button className='btn IconButton' onClick={::this._togglePicker}>
          <i className={toggleIcon} />
        </button>

      </div>
    )
  }

}

export default App
