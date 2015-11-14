import React, { Component } from 'react'

import * as widgets from 'components/widgets'

class Widget extends Component {

  render () {
    const { data } = this.props
    const W = widgets[data.type]
    if (!W) { throw new Error(`Unknown widget type ${data.type}`) }
    return (
      <div className='Widget-container'>
        <W />
      </div>
    )
  }

}

export default Widget
