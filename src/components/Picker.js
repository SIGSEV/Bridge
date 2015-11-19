import React, { Component } from 'react'
import { connect } from 'react-redux'

import { addWidget } from 'actions/widgets'
import { closePicker } from 'actions/picker'
import { save } from 'actions/global'

@connect(
  state => ({
    targetCol: state.picker.targetCol
  })
)
class Picker extends Component {

  addWidget (type) {
    const { targetCol } = this.props
    this.props.dispatch(addWidget({ targetCol, type }))
    this.props.dispatch(save())
    this.props.dispatch(closePicker())
  }

  render () {
    const widgetsNames = [
      'Weather',
      'Github',
      'StackOverflow',
      'Dribbble',
      'Bitcoin'
    ]
    return (
      <div className='Picker'>
        {widgetsNames.map((widgetName, i) => (
          <div key={i} className='btn btn-def item' tabIndex={0}
            onClick={this.addWidget.bind(this, widgetName)}>
            {widgetName}
          </div>
        ))}
      </div>
    )
  }

}

export default Picker
