import React, { Component } from 'react'
import { connect } from 'react-redux'

import { addWidget } from 'actions/widgets'
import { closePicker } from 'actions/picker'

@connect(
  state => ({
    targetCol: state.picker.targetCol
  })
)
class Picker extends Component {

  addWidget (type) {
    const { targetCol } = this.props
    this.props.dispatch(addWidget({ targetCol, type }))
    this.props.dispatch(closePicker())
  }

  render () {
    const { targetCol } = this.props
    console.log(targetCol)
    return (
      <div className='Picker'>
        <div className='btn btn-def item' tabIndex={0} onClick={this.addWidget.bind(this, 'Weather')}>
          {'Weather'}
        </div>
        <div className='btn btn-def item' tabIndex={0} onClick={this.addWidget.bind(this, 'Github')}>
          {'Github'}
        </div>
        <div className='btn btn-def item' tabIndex={0} onClick={this.addWidget.bind(this, 'StackOverflow')}>
          {'StackOverflow'}
        </div>
      </div>
    )
  }

}

export default Picker
