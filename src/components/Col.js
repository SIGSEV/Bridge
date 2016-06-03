import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import _ from 'lodash'
import { connect } from 'react-redux'
import { DropTarget } from 'react-dnd'

import Widget from 'components/Widget'
import { openPicker } from 'actions/picker'
import DragZone from 'components/DragZone'

@connect(
  state => ({
    editMode: state.mode.status === 'edit'
  })
)
@DropTarget('widget', {
  hover: (props, monitor, component) => {
    const currentOffset = monitor.getClientOffset().y
    const hoveredIndex = component._offsets
      .reduce((hovered, offset, i) => i > hovered && Math.abs(currentOffset - offset) < Math.abs(currentOffset - component._offsets[hovered]) ? i : hovered, 0)
    if (hoveredIndex !== component.state.hoveredIndex) {
      component.setState({ hoveredIndex })
    }
  },
  drop: ({ col }, monitor, { state: { hoveredIndex } }) => ({ col, hoveredIndex })
}, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))
class Col extends Component {

  state = {
    hoveredIndex: 0,
  }

  componentDidUpdate () { this.updateOffset() }

  updateOffset () {
    this._offsets = _.flow(
      refs => _.pickBy(refs, (v, k) => _.startsWith(k, 'dropZone')),
      _.keys,
      keys => _.sortBy(keys, k => Number(k.split('dropZone')[1])),
      keys => _.map(keys, k => {
        const n = findDOMNode(this.refs[k])
        const r = n.getBoundingClientRect()
        return r.top
      })
    )(this.refs)
  }

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
      isOver,
    } = this.props
    const { hoveredIndex } = this.state

    return connectDropTarget(
      <div className='Col'>

        <DragZone active={isOver && hoveredIndex === 0} ref='dropZone0' />

        {widgetsIds.map((id, i) => (
          <div key={id} className='DropWrapper'>
            <div className='WidgetWrapper'>
              <Widget id={id} indexInCol={i} col={col} />
            </div>
            <DragZone active={isOver && hoveredIndex === i + 1} ref={`dropZone${i + 1}`} />
          </div>
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
