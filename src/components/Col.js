import React, { Component } from 'react'
import { connect } from 'react-redux'

import Widget from 'components/Widget'
import { openPicker } from 'actions/picker'
import DragZone from 'components/DragZone'

@connect(
  state => ({
    editMode: state.mode === 'edit'
  })
)
class Col extends Component {

  openPickerForCol (col) {
    this.props.dispatch(openPicker(col))
  }

  render () {
    const { hasWidgets, widgetsIds, col, editMode } = this.props

    return (
      <div className='Col'>

        {widgetsIds.length === 0 ? (
          <div style={{ width: '70%' }}>
            <DragZone />
          </div>
        ) : widgetsIds.map((id, i) => (
          <Widget key={id} id={id} indexInCol={i} />
        ))}

        {hasWidgets && editMode && (
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
