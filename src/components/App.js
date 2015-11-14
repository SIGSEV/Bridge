import React, { Component } from 'react'
import ReactTransitionGroup from 'react/lib/ReactTransitionGroup'
import { connect } from 'react-redux'

import 'styles/app.scss'

import { toggleEditMode } from 'actions/mode'

@connect(
  state => ({
    editMode: state.mode === 'edit'
  })
)
class App extends Component {

  _toggleEditMode () {
    this.props.dispatch(toggleEditMode())
  }

  render () {
    const { editMode } = this.props
    const toggleIcon = (editMode)
      ? 'ion-checkmark'
      : 'ion-gear-b'
    return (
      <div className='App'>

        <ReactTransitionGroup>
        </ReactTransitionGroup>

        <button className='btn IconButton' onClick={::this._toggleEditMode}>
          <i className={toggleIcon} />
        </button>

      </div>
    )
  }

}

export default App
