import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DropTarget } from 'react-dnd'

import Widget from 'components/Widget'
import { openPicker } from 'actions/picker'
import DragZone from 'components/DragZone'

@connect(
  state => ({
    editMode: state.mode === 'edit'
  })
)
@DropTarget('widget', {
  canDrop: ({ widgetsIds: { length } }) => length === 0,
  drop: ({ col }) => ({ col })
}, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))
class Col extends Component {

  openPickerForCol (col) {
    this.props.dispatch(openPicker(col))
  }

  render () {
    const {
      hasWidgets,
      widgetsIds,
      col,
      editMode,
      connectDropTarget,
      isOver
    } = this.props

    return connectDropTarget(
      <div className='Col'>

        {widgetsIds.length === 0 ? (
          <div style={{ width: '70%' }}>
            <DragZone top active={isOver} />
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
