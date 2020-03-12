import React, { Component } from 'react'
import SkyCons from 'react-skycons'

class Weather extends Component {
  render() {
    const { desc, icon, temperature, projections } = this.props.data.values

    return (
      <div className="w-weather">
        <span className="boris">{desc}</span>

        <h1 className="big-val za" style={{ marginTop: 0, marginBottom: '1rem' }}>
          <SkyCons style={{ width: 110, height: 55 }} color="#bababa" icon={icon} />

          {`${temperature}°`}
        </h1>

        <section className="gallery">
          {projections.map(projection => (
            <div key={projection.ts}>
              <SkyCons style={{ width: 80, height: 40 }} color="#bababa" icon={projection.icon} />
              <div className="mende">
                {projection.time} {`${projection.temperature}°`}
              </div>
            </div>
          ))}
        </section>
      </div>
    )
  }
}

export default Weather
