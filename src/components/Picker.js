import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { closePicker } from 'actions'

@connect(
  state => ({
    picker: state.ui.picker
  }),
  dispatch => bindActionCreators({
    closePicker
  }, dispatch)
)
class Picker extends React.Component {

  render () {
    const { closePicker } = this.props
    return (
      <div>
        {'picker'}
        <div className='btn' onClick={closePicker}>close</div>
      </div>
    )
  }

}

export default Picker
