import React, { Component } from 'react'

import Widget from 'components/Widget'

class Col extends Component {

  render () {
    const { widgetsIds, editMode } = this.props

    return (
      <div className='Col'>
        {widgetsIds.map((w, i) => <Widget key={i} type={w} />)}

        {editMode && (
          <div className='add-btn' tabIndex={0}>
            <i className='ion-plus' />
            {'Add widget'}
          </div>
        )}
      </div>
    )
  }

}

export default Col
