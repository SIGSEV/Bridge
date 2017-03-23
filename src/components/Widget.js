import classnames from 'classnames'
import { DragSource } from 'react-dnd'
import { connect } from 'react-redux'
import { isArray, isEqual } from 'lodash'
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

    const state = { edit: false, now: new Date().getTime() }

    if (requires) {
      requires.forEach(dep => {
        if (!config[dep]) { state.edit = true }
        if (isArray(config[dep]) && !config[dep].length) { state.edit = true }
      })
    }

    this.state = state
  }

  componentDidMount () {
    this.startReload()
    if (this.state.edit) { return }
    this.fetchData()
  }

  componentWillUpdate (nextProps) {
    const { now } = this.state
    const { widget } = this.props
    const diff = Math.abs(Math.round((now - widget.lastFetch) / 1E3))

    if (!widgets[widget.type]) { return }

    const { reload } = widgets[widget.type]
    if (!reload) { return }

    if (this._int && diff > reload) {
      clearInterval(this._int)
      this._int = null
      this.fetchData()
    }

    if (!this._int && nextProps.widget.loaded) {
      this.startReload()
    }
  }

  componentWillUnmount () {
    clearInterval(this._int)
  }

  startReload = () => {
    const { type } = this.props.widget

    if (!widgets[type]) { return }

    const { reload } = widgets[type]
    if (!reload) { return }

    this.setState({ now: new Date().getTime() })
    this._int = setInterval(() => this.setState({ now: new Date().getTime() }), 1E3)
  }

  fetchData = () => {
    const { dispatch, id } = this.props
    dispatch(fetchWidget(id))
  }

  toggleEditMode = () => {
    this.setState({ edit: !this.state.edit })
  }

  removeWidget = () => {
    const { id } = this.props
    this.props.dispatch(removeWidget(id))
    this.props.dispatch(save())
  }

  configureWidget = (config, shouldClose) => {
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
    const { edit, now } = this.state
    const { loading, loaded, lastFetch, fetchedWith, config, type } = widget
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
              <div className='ctx-btn' onClick={this.removeWidget} tabIndex={1}>
                <i className='ion-close' />
              </div>
              {moveButton}
              {component && !!component.config && (
                <div className='ctx-btn' onClick={this.toggleEditMode} tabIndex={2}>
                  <i className='ion-edit' />
                </div>
              )}
            </div>
          )}
        </div>

        {component && (
          <div className={`Widget ${type}`} style={{ ...component.style }}>

            {(!edit && !loading && !loaded) ? (
              <div className='loading'>
                {'Loading issue'}
              </div>
            ) : (!edit && loading && (!lastFetch || (lastFetch && !isEqual(config, fetchedWith)))) ? (
              <div className='loading'>
                <Loader />
              </div>
            ) : (
              <div>
                <W
                  id={id}
                  onSave={this.configureWidget}
                  edit={edit && editMode}
                  now={now}
                  loaded={loaded}
                  data={widget} />
                {loading && (<Loader className='refreshing' />)}
              </div>
            )}

          </div>
        )}

        {!component && <div>{'Unknown component.'}</div>}

      </div>
    )
  }

}

export default Widget
