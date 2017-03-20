import React, { Component } from 'react'
import { connect } from 'react-redux'

import widgets from 'widgets'
import { addWidget } from 'actions/widgets'
import { closePicker } from 'actions/picker'
import { save } from 'actions/global'

@connect(
  ({ picker: { targetCol } }) => ({ targetCol })
)
class Picker extends Component {

  addWidget (type) {
    const { targetCol } = this.props
    this.props.dispatch(addWidget({ targetCol, type }))
    this.props.dispatch(save())
    this.props.dispatch(closePicker())
  }

  render () {

    const widgetsNames = Object.keys(widgets)

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
