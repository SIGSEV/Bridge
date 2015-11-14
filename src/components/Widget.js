import { connect } from 'react-redux'
import React, { Component } from 'react'

import * as widgetsComponents from 'components/widgets'

@connect(
  state => ({
    widgets: state.layout.widgets
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
    const { type, widgets } = this.props
    const widget = widgets[type]
    const { loading } = widget

    const W = widgetsComponents[type]
    if (!W) { throw new Error(`Unknown widget type ${type}`) }

    return (
      <div className='Widget-container'>
        {loading && (
          <div>{'loading'}</div>
        )}
        <W data={widget} />
      </div>
    )
  }

}

export default Widget
