import 'whatwg-fetch'

import classnames from 'classnames'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import 'styles/app.scss'

import Col from 'components/Col'

import { toggleEditMode } from 'actions/mode'

@connect(
  state => ({
    editMode: state.mode === 'edit',
    layout: state.layout
  })
)
class App extends Component {

  _toggleEditMode () {
    this.props.dispatch(toggleEditMode())
  }

  render () {
    const { editMode, layout } = this.props
    const { cols, widgets } = layout

    const toggleIcon = (editMode)
      ? 'ion-checkmark'
      : 'ion-gear-b'

    const btnCl = classnames('IconButton', {
      success: editMode
    })

    return (
      <div className='App'>

        <button className={btnCl} onClick={::this._toggleEditMode}>
          <i className={toggleIcon} />
        </button>

        {cols.map((widgetsIds, i) => (
          <Col key={i}
            editMode={editMode}
            widgetsIds={widgetsIds}
            widgets={widgets} />)
        )}

      </div>
    )
  }

}

export default App
