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
    const { widgetsIds, editMode, col } = this.props

    return (
      <div className='Col'>

        {widgetsIds.map((id, i) => (
          <Widget key={i} id={id} />
        ))}

        {editMode && (
          <div className='add-btn'
            onClick={this.openPickerForCol.bind(this, col)}
            tabIndex={0}>
            <i className='ion-plus-round' />
            {'Add'}
          </div>
        )}

      </div>
    )
  }

}

export default Col
