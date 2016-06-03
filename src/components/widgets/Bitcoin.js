import React, { Component } from 'react'

class Bitcoin extends Component {

  _getDiff (date) {
    const now = new Date()
    const diff = Math.abs(now.getTime() - date.getTime())
    const mins = Math.ceil(diff / 60000)
    if (mins === 1) { return `${mins} min` }
    return `${mins} mins`
  }

  render () {
    const { values } = this.props.data
    const timestamp = new Date(values.timestamp)

    return (
      <div className='z w-bitcoin'>
        <div className='bitcoin--title'>
          <span>{values.last}</span>
          <i className='ion-social-bitcoin'/>
        </div>
        <div className='bitcoin--update'>
          updated {this._getDiff(timestamp)} ago
        </div>
        <div className='bitcoin--values'>
          <span>
            <i className='ion-arrow-graph-up-right'/>{values.high}
          </span>
          <span>
            <i className='ion-arrow-graph-down-right'/>{values.low}
          </span>
        </div>
        <div className='bitcoin--values'>
          <span>
            <i className='ion-stats-bars'/>{values.volume}
          </span>
        </div>
      </div>
    )
  }

}

export default Bitcoin
