import classnames from 'classnames'
import { connect } from 'react-redux'
import React, { Component } from 'react'

import { Loader } from 'components'
import * as widgetsComponents from 'components/widgets'
import { removeWidget } from 'actions/widgets'
import { configWidget } from 'actions/widgets'
import { save } from 'actions/global'
import widgets from 'widgets'

import { fetchWidget } from 'actions/widgets'

@connect(
  state => ({
    editMode: state.mode === 'edit',
    currentWidgets: state.layout.widgets
  }),
  null,
  (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    widget: stateProps.currentWidgets[ownProps.id]
  })
)
class Widget extends Component {

  constructor (props) {
    super(props)
    const { config, requires } = this.props.widget

    const state = { edit: false }
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
    const { widget, id, editMode } = this.props
    const { edit } = this.state
    const { loading, loaded, type } = widget
    const { style, config } = widgets[widget.type]

    const W = widgetsComponents[type]

    const classes = classnames('Widget-container', { edit: editMode })

    return (
      <div className={classes}>

        <div className='ctx'>
          {editMode && (
            <div>
              <div className='ctx-btn' onClick={this.removeWidget.bind(this, id)} tabIndex={0}>
                <i className='ion-close' />
              </div>
              {!!config && (
                <div className='ctx-btn' onClick={::this.toggleEditMode} tabIndex={1}>
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
  }

}

export default Widget
