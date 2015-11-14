import React, { Component } from 'react'

import Widget from 'components/Widget'

class Col extends Component {

  render () {
    const { widgets } = this.props

    return (
      <div className='Col'>
        {widgets.map((w, i) => <Widget key={i} data={w} />)}
      </div>
    )
  }

}

export default Col
