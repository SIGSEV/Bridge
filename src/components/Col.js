import React, { Component } from 'react'
import { connect } from 'react-redux'

import Widget from 'components/Widget'
import { openPicker } from 'actions/picker'

@connect()
class Col extends Component {

  openPickerForCol (col) {
    this.props.dispatch(openPicker(col))
  }

  render () {
    const { hasWidgets, widgetsIds, col } = this.props

    return (
      <div className='Col'>

        {widgetsIds.map((id, i) => (
          <Widget key={i} id={id} />
        ))}

        {hasWidgets && (
          <div className='add-btn' tabIndex={0} onClick={this.openPickerForCol.bind(this, col)}>
            <i className='ion-android-add' />
            {'Add'}
          </div>
        )}

      </div>
    )
  }

}

export default Col
