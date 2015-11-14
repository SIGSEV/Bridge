import classnames from 'classnames'
import { connect } from 'react-redux'
import React, { Component } from 'react'

import * as widgetsComponents from 'components/widgets'

@connect(
  state => ({
    widgets: state.layout.widgets,
    editMode: state.mode === 'edit'
  })
)
class Widget extends Component {

  constructor (props) {
    super(props)
  }

  componentDidMount () {
    const { dispatch, type, widgets } = this.props

    const widget = widgets[type]
    widget.fetch(dispatch)
  }

  render () {
    const { type, widgets, editMode } = this.props
    const widget = widgets[type]
    const { loading } = widget

    const W = widgetsComponents[type]
    if (!W) { throw new Error(`Unknown widget type ${type}`) }

    const classes = classnames('Widget-container', {
      edit: editMode
    })

    return (
      <div className={classes}>

        {editMode && (
          <div className='ctx'>
            <div className='ctx-btn'>
              <i className='ion-close' />
            </div>
          </div>
        )}

        {loading && (
          <div>{'loading'}</div>
        )}

        {!loading && (
          <W data={widget} />
        )}

      </div>
    )
  }

}

export default Widget
