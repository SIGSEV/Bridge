import { once } from 'lodash'
import classnames from 'classnames'
import { connect } from 'react-redux'
import React, { Component } from 'react'

import { Loader } from 'components'
import * as widgetsComponents from 'components/widgets'
import { removeWidget } from 'actions/widgets'
import { save } from 'actions/global'
import checkStatus from 'helpers/check-status'
import widgets from 'widgets'

const { api } = process.env.config

import {
  widgetFetch,
  widgetFetched,
  widgetFailed
} from 'actions/widgets'

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

    this.state = {
      edit: false
    }

    this.setEditModeOnce = once(::this.setEditMode)
  }

  componentDidMount () {
    const { lastFetch, type } = this.props.widget
    const { timeToRefresh } = widgets[type]

    if (!lastFetch || Date.now() - lastFetch > timeToRefresh) {
      this.fetchData()
    }
  }

  componentWillUnmount () {
    if (this._fetchInterval) {
      clearTimeout(this._fetchInterval)
    }
  }

  fetchData () {
    const { dispatch, id, widget } = this.props
    const { url } = widgets[widget.type]

    dispatch(widgetFetch(id))

    fetch(`${api}${url}`)
      .then(checkStatus)
      .then(res => res.json())
      .then(values => {
        dispatch(widgetFetched({ id, values }))
        dispatch(save())
      })
      .catch(() => { dispatch(widgetFailed(id)) })
  }

  setEditMode (edit) {
    this.setState({ edit })
  }

  removeWidget (id) {
    this.props.dispatch(removeWidget(id))
    this.props.dispatch(save())
  }

  render () {
    const { edit } = this.state
    const { widget, id } = this.props
    const { loading, loaded, type } = widget
    const { style } = widgets[widget.type]

    const W = widgetsComponents[type]

    const classes = classnames('Widget-container', {
      edit
    })

    return (
      <div className={classes}
        onMouseOver={this.setEditModeOnce.bind(this, true)}
        onMouseEnter={this.setEditMode.bind(this, true)}
        onMouseLeave={this.setEditMode.bind(this, false)}>

        <div className='ctx'>
          {edit && (
            <div className='ctx-btn' onClick={this.removeWidget.bind(this, id)} tabIndex={0}>
              <i className='ion-close' />
            </div>
          )}
        </div>

        <div className='Widget' style={{ ...style }}>

          {loading && (
            <div className='loading'>
              <Loader />
            </div>
          )}

          {(!loading && !loaded) && (
            <div className='loading'>
              {'Loading problem'}
            </div>
          )}

          {!loading && loaded && (
            <W data={widget} />
          )}

        </div>

      </div>
    )
  }

}

export default Widget
