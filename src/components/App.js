import 'whatwg-fetch'

import Portal from 'react-portal'
import React, { Component } from 'react'
import { connect } from 'react-redux'

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
class App extends Component {

  constructor (props) {
    super(props)
    this.state = { shouldHelp: false }
  }

  componentDidMount () {
    this.handleKey = ::this.handleKey
    window.addEventListener('keydown', this.handleKey)
  }

  componentWillUnmount () {
    window.removeEventListener('keydown', this.handleKey)
  }

  handleKey (e) {
    if (e.ctrlKey && e.which === 69) {
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

  showHelp () {
    this.setState({ shouldHelp: true })
  }

  closeHelp () {
    this.setState({ shouldHelp: false })
  }

  render () {
    const { layout, picker, hasWidgets } = this.props
    const { shouldHelp } = this.state
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

        <Portal className='HelpModal'
          isOpened={shouldHelp}
          closeOnOutsideClick
          onClose={::this.closeHelp}
          closeOnEsc>
          <div className='BHC'>
            <h1>BHC (Bridge Help Center)</h1>
            <div>Press Esc to close modals, like this one.</div>
            <div>Press CTRL+E to toggle the Edit mode.</div>
            <div>Edit mode will allow you to configure widgets when available and change your layout.</div>
          </div>
        </Portal>

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

        {hasWidgets && (
          <div className='IconButton' onClick={::this.showHelp} tabIndex={0}>
            <i className='ion-help'/>
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
