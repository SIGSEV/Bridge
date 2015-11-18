import React, { Component } from 'react'

class Weather extends Component {

  render () {
    const { atmosphere, condition } = this.props.data.values
    return (
      <div className='w-weather'>
        <span className='boris'>
          {condition.text}
        </span>
        <h1 className='big-val'>
          {`${condition.celsius}°`}
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
