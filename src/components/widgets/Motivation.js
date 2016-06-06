import React, { Component } from 'react'

class Motivation extends Component {

  render () {
    const { data: { values: { txt } } } = this.props

    return <div className='w-motivation'>{txt}</div>
  }

}

export default Motivation
