import classnames from 'classnames'
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import React, { Component } from 'react'

import { Loader } from 'components'
import * as widgetsComponents from 'components/widgets'
import DragZone from 'components/DragZone'
import { removeWidget, moveWidget } from 'actions/widgets'
import { configWidget } from 'actions/widgets'
import { save, startDrag, stopDrag } from 'actions/global'
import widgets from 'widgets'

import { fetchWidget } from 'actions/widgets'

const getDropDirection = (monitor, component) => {
  const clientOffset = monitor.getClientOffset()
  const componentRect = findDOMNode(component).getBoundingClientRect()
  const middleLimit = (componentRect.height / 2) + componentRect.top
  return clientOffset.y > middleLimit ? 'bot' : 'top'
}

// lolo, TODO: find better
let lastDirection = null

@connect(
  (state) => {
    return {
      editMode: state.mode === 'edit',
      currentWidgets: state.layout.widgets,
    }
  },
  null,
  (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    widget: stateProps.currentWidgets[ownProps.id]
  })
)
@DropTarget('widget', {
  canDrop: () => true,
  hover: (props, monitor, component) => {
    const dropDirection = getDropDirection(monitor, component)
    component.decoratedComponentInstance.setState({ dropDirection })
    lastDirection = dropDirection
  },
  drop: (props) => ({
    id: props.id,
  })
}, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))
@DragSource('widget', {
  beginDrag: props => {
    props.dispatch(startDrag(props.id))
    return {
      id: props.id
    }
  },
  endDrag: (props, monitor) => {
    props.dispatch(stopDrag())
    if (monitor.didDrop()) {
      const res = monitor.getDropResult()
      props.dispatch(moveWidget({
        siblingId: res.id,
        widgetId: props.id,
        direction: lastDirection,
      }))
    }
  }
}, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging(),
}))
class Widget extends Component {

  constructor (props) {
    super(props)
    const { config, requires } = this.props.widget

    const state = {
      edit: false,
      dropDirection: null
    }
    if (requires) {
      requires.forEach(dep => {
        if (!config[dep]) { state.edit = true }
      })
    }
    this.state = state
  }

  componentDidMount () {
    if (this.state.edit) { return }
    this.fetchData()
  }

  fetchData () {
    const { dispatch, id } = this.props
    dispatch(fetchWidget(id))
  }

  toggleEditMode () {
    this.setState({ edit: !this.state.edit })
  }

  removeWidget (id) {
    this.props.dispatch(removeWidget(id))
    this.props.dispatch(save())
  }

  configureWidget (config, shouldClose) {
    const { id, dispatch } = this.props
    dispatch(configWidget({ id, config }))
    if (shouldClose) { this.setState({ edit: false }) }
  }

  render () {
    const {
      widget,
      id,
      editMode,
      connectDragSource,
      connectDragPreview,
      connectDropTarget,
      isOver
    } = this.props
    const { edit, dropDirection } = this.state
    const { loading, loaded, type } = widget
    const { style, config } = widgets[widget.type]

    const W = widgetsComponents[type]

    const classes = classnames('Widget-container', { edit: editMode })

    const moveButton = connectDragSource(
      <div className='DragButton ctx-btn' tabIndex={0}>
        <i className='ion-arrow-move' />
      </div>
    )

    const widgetElement = connectDragPreview(
      <div className={classes}>

        <div className='ctx'>
          {editMode && (
            <div>
              <div className='ctx-btn' onClick={this.removeWidget.bind(this, id)} tabIndex={1}>
                <i className='ion-close' />
              </div>
              {moveButton}
              {!!config && (
                <div className='ctx-btn' onClick={::this.toggleEditMode} tabIndex={2}>
                  <i className='ion-edit' />
                </div>
              )}
            </div>
          )}
        </div>

        <div className={`Widget ${type}`} style={{ ...style }}>

          {loading && (
            <div className='loading'>
              <Loader />
            </div>
          )}

          {(!edit && !loading && !loaded) && (
            <div className='loading'>
              {'Loading problem'}
            </div>
          )}

          {(edit || !loading && loaded) && (
            <W onSave={::this.configureWidget} edit={edit && editMode} data={widget} />
          )}

        </div>

      </div>
    )

    return connectDropTarget(
      <div>
        <DragZone top active={isOver && dropDirection === 'top'} />
        {widgetElement}
        <DragZone active={isOver && dropDirection === 'bot'} />
      </div>
    )
  }

}

export default Widget
