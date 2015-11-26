import React, { Component } from 'react'

class Weather extends Component {

  render () {
    const { desc, icon, temp, pressure, wind } = this.props.data.values
    return (
      <div className='w-weather'>
        <span className='boris'>
          {desc}
        </span>
        <h1 className='big-val za'>
          <i className={icon}/>
          {`${temp}°`}
        </h1>
        <section className='gallery'>

          <div className='mende'>
            <h1>{'Pressure'}</h1>
            <span>{pressure}</span>
          </div>

          <div className='mende'>
            <h1>{'Wind'}</h1>
            <span>{wind}</span>
          </div>

        </section>
      </div>
    )
  }

}

export default Weather
