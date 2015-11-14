import React, { Component } from 'react'

class Weather extends Component {

  render () {
    const { data } = this.props.data
    const { celsius } = data.condition
    return (
      <div className='Widget'>
        <img src={data.img} />
        {`temperature = ${celsius}`}
      </div>
    )
  }

}

export default Weather
