import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import 'styles/app.scss'

import { Picker } from 'components'

import { openPicker } from 'actions'

@connect(
  state => ({
    picker: state.ui.picker
  }),
  dispatch => bindActionCreators({
    openPicker
  }, dispatch)
)
class App extends React.Component {

  render () {
    const { picker, openPicker } = this.props
    return (
      <div className='App'>

        {picker && (
          <Picker />
        )}

        {!picker && (
          <div className='btn' onClick={openPicker}>
            {'open'}
          </div>
        )}

      </div>
    )
  }

}

export default App
