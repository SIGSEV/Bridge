import 'whatwg-fetch'

import Portal from 'react-portal'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import 'styles/app.scss'

import Col from 'components/Col'
import Picker from 'components/Picker'
import { openPicker, closePicker } from 'actions/picker'

@connect(
  state => ({
    editMode: state.mode === 'edit',
    picker: state.picker,
    layout: state.layout,
    hasWidgets: !!(Array.prototype.concat.apply([], state.layout.cols).length)
  })
)
class App extends Component {

  handleAddFirstWidget () {
    const { dispatch } = this.props
    dispatch(openPicker(1))
  }

  closePicker () {
    const { dispatch } = this.props
    dispatch(closePicker())
  }

  render () {
    const { layout, picker, hasWidgets } = this.props
    const { cols, widgets } = layout

    return (
      <div className='App'>

        {/* columns */}

        {cols.map((widgetsIds, i) => (
          <Col key={i}
            hasWidgets={hasWidgets}
            col={i}
            widgetsIds={widgetsIds}
            widgets={widgets} />)
        )}

        {/* picker */}

        <Portal className='Modal'
          isOpened={picker.open}
          onClose={::this.closePicker}
          closeOnEsc
          closeOnOutsideClick>
          <PseudoModal>
            <Picker />
          </PseudoModal>
        </Portal>

        {/* blank state */}

        {!hasWidgets && (
          <div className='BlankState'>
            {'You have no widgets.'}
            <br/>
            <div className='btn-ui' tabIndex={0} onClick={::this.handleAddFirstWidget}>
              <i className='ion-plus-circled' />
              {'Maybe try adding one?'}
            </div>
          </div>
        )}

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
