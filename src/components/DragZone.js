import React, { Component } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'

@connect(
  state => ({
    dragging: !!state.picker.drag
  })
)
class DragZone extends Component {

  render () {
    const { dragging, active, top } = this.props

    return (
      <div className={cx('DragZone', {
        visible: dragging,
        active,
        top,
      })} />
    )
  }

}

export default DragZone
