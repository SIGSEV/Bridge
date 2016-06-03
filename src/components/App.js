import 'whatwg-fetch'

import Portal from 'react-portal'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import 'styles/app.scss'
import 'weather-icons-tmp/css/weather-icons.min.css'
import 'react-select/dist/react-select.min.css'

import Col from 'components/Col'
import Picker from 'components/Picker'
import { openPicker, closePicker } from 'actions/picker'
import { toggleEditMode } from 'actions/mode'

@connect(
  state => ({
    picker: state.picker,
    layout: state.layout,
    hasWidgets: !!(Array.prototype.concat.apply([], state.layout.cols).length)
  }),
)
@DragDropContext(HTML5Backend)
class App extends Component {

  componentDidMount () {
    this.handleKey = ::this.handleKey
    window.addEventListener('keydown', this.handleKey)
  }

  componentWillUnmount () {
    window.removeEventListener('keydown', this.handleKey)
  }

  handleKey (e) {
    if (e.which === 69) {
      const { dispatch } = this.props
      dispatch(toggleEditMode())
    }
  }

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

        {cols.map((widgetsIds, i) => (
          <Col key={i}
            hasWidgets={hasWidgets}
            col={i}
            widgetsIds={widgetsIds}
            widgets={widgets} />)
        )}

        <Portal className='Modal'
          isOpened={picker.open}
          onClose={::this.closePicker}
          closeOnEsc
          closeOnOutsideClick>
          <PseudoModal>
            <Picker />
          </PseudoModal>
        </Portal>

        {!hasWidgets && (
          <div className='BlankState'>
            <span>{'You have no widgets.'}</span>
            <div className='btn-ui' tabIndex={0} onClick={::this.handleAddFirstWidget}>
              <i className='ion-plus-circled' />
              {'Maybe try adding one?'}
            </div>
            <span className='hint'>{'Remember to press E for toggling edit mode anytime.'}</span>
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
