import React, { Component } from 'react'

class Weather extends Component {

  render () {
    const { data } = this.props.data
    const { celsius } = data.condition
    const { atmosphere } = data
    return (
      <div className='Widget'>
        <span className='boris'>
          {data.condition.text}
        </span>
        <h1 className='big-val'>
          {`${celsius}°`}
        </h1>
        <section className='gallery'>

          <div className='mende'>
            <h1>{'Humidity'}</h1>
            <span>{atmosphere.humidity}</span>
          </div>

          <div className='mende'>
            <h1>{'Pressure'}</h1>
            <span>{atmosphere.pressure}</span>
          </div>

        </section>
      </div>
    )
  }

}

export default Weather
