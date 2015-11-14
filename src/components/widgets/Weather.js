import React, { Component } from 'react'

class Weather extends Component {

  render () {
    const { data } = this.props
    const { values } = data
    const { atmosphere, condition } = values
    return (
      <div className='Widget' style={data.style}>
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
