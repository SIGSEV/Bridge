import React, { Component } from 'react'

import Widget from 'components/Widget'

class Col extends Component {

  render () {
    const { widgetsIds } = this.props

    return (
      <div className='Col'>
        {widgetsIds.map((w, i) => <Widget key={i} type={w} />)}
      </div>
    )
  }

}

export default Col
