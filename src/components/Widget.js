import classnames from 'classnames'
import { DragSource } from 'react-dnd'
import { connect } from 'react-redux'
import { isArray } from 'lodash'
import React, { Component } from 'react'

import { Loader } from 'components'
import * as widgetsComponents from 'components/widgets'
import { removeWidget, moveWidget } from 'actions/widgets'
import { configWidget } from 'actions/widgets'
import { save, startDrag, stopDrag } from 'actions/global'
import widgets from 'widgets'

import { fetchWidget } from 'actions/widgets'

@connect(
  (state) => {
    return {
      editMode: state.mode.status === 'edit',
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
@DragSource('widget', {
  beginDrag: props => {
    props.dispatch(startDrag(props.id))
    return {
      id: props.id
    }
  },
  endDrag: (props, monitor) => {
    props.dispatch(stopDrag())
    if (!monitor.didDrop()) { return }

    const { col: targetColIndex, hoveredIndex } = monitor.getDropResult()
    const { col: sourceColIndex, indexInCol, id: widgetId } = props

    const sameCol = targetColIndex === sourceColIndex
    const samePos = (hoveredIndex === indexInCol || hoveredIndex === indexInCol + 1)

    // Decrement index if we drop after in same column
    const newIndex = (sameCol && hoveredIndex > indexInCol) ? hoveredIndex - 1 : hoveredIndex

    // Do not dispatch the action if we haven't changed position
    if (sameCol && samePos) { return }

    props.dispatch(moveWidget({
      targetColIndex,
      sourceColIndex,
      newIndex,
      indexInCol,
      widgetId
    }))
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

    const state = { edit: false }

    if (requires) {
      requires.forEach(dep => {
        if (!config[dep]) { state.edit = true }
        if (isArray(config[dep]) && !config[dep].length) { state.edit = true }
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
      connectDragPreview
    } = this.props
    const { edit } = this.state
    const { loading, loaded, type } = widget
    const component = widgets[widget.type]

    const W = widgetsComponents[type]

    const classes = classnames('Widget-container', { edit: editMode })

    const moveButton = connectDragSource(
      <div className='DragButton ctx-btn' tabIndex={0}>
        <i className='ion-arrow-move' />
      </div>
    )

    return connectDragPreview(
      <div className={classes}>

        <div className='ctx'>
          {editMode && (
            <div>
              <div className='ctx-btn' onClick={this.removeWidget.bind(this, id)} tabIndex={1}>
                <i className='ion-close' />
              </div>
              {moveButton}
              {component && !!component.config && (
                <div className='ctx-btn' onClick={::this.toggleEditMode} tabIndex={2}>
                  <i className='ion-edit' />
                </div>
              )}
            </div>
          )}
        </div>

        {component && (
          <div className={`Widget ${type}`} style={{ ...component.style }}>

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
        )}

        {!component && <div>{'Unknown component.'}</div>}

      </div>
    )
  }

}

export default Widget
