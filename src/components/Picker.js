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
    this.props.dispatch(addWidget({ targetCol: 0, type }))
    this.props.dispatch(save())
    this.props.dispatch(closePicker())
  }

  render () {
    const widgetsNames = [
      'Weather',
      'Github',
      'StackOverflow',
      'Dribbble',
      'Bitcoin',
      'Rss'
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
