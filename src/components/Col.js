import React, { Component } from 'react'
import ReactTransitionGroup from 'react/lib/ReactTransitionGroup'

import Widget from 'components/Widget'
import Slider from 'components/Slider'

class Col extends Component {

  render () {
    const { widgetsIds, editMode } = this.props

    return (
      <div className='Col'>

        <ReactTransitionGroup>
          {widgetsIds.map((w, i) => (
            <Slider key={i}>
              <Widget type={w} />
            </Slider>
          ))}
        </ReactTransitionGroup>

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
