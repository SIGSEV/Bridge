import 'whatwg-fetch'

import Portal from 'react-portal'
import classnames from 'classnames'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import 'styles/app.scss'

import Col from 'components/Col'
import Picker from 'components/Picker'

import { toggleEditMode } from 'actions/mode'

@connect(
  state => ({
    editMode: state.mode === 'edit',
    picker: state.picker,
    layout: state.layout
  })
)
class App extends Component {

  _toggleEditMode () {
    this.props.dispatch(toggleEditMode())
  }

  render () {
    const { editMode, layout, picker } = this.props
    const { cols, widgets } = layout

    const toggleIcon = (editMode)
      ? 'ion-checkmark'
      : 'ion-gear-b'

    const btnCl = classnames('IconButton', {
      success: editMode
    })

    return (
      <div className='App'>

        {/* toggle edit mode button */}

        <button className={btnCl} onClick={::this._toggleEditMode}>
          <i className={toggleIcon} />
        </button>

        {/* columns */}

        {cols.map((widgetsIds, i) => (
          <Col key={i}
            col={i}
            editMode={editMode}
            widgetsIds={widgetsIds}
            widgets={widgets} />)
        )}

        {/* picker */}

        <Portal className='Modal'
          isOpened={picker.open}
          closeOnEsc
          closeOnOutsideClick>
          <PseudoModal>
            <Picker />
          </PseudoModal>
        </Portal>

      </div>
    )
  }

}

class PseudoModal extends React.Component {

  render () {
    return (
      <div className='PseudoModal'>
        <div style={{ marginBottom: '1em' }}>
          {this.props.children}
        </div>
        <div style={{ textAlign: 'right' }}>
          <div tabIndex={0}
            className='btn btn-def btn-oe'
            onClick={this.props.closePortal}>
            <i className='ion-close' />
            {'Cancel'}
          </div>
        </div>
      </div>
    )
  }

}

export default App
