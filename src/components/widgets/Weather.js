import React, { Component } from 'react'

class Weather extends Component {

  render () {
    const { data } = this.props
    console.log(data)
    return (
      <div className='Widget'>
        {'Weather'}
      </div>
    )
  }

}

export default Weather
