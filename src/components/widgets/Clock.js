import React, { Component } from 'react'

class Clock extends Component {
  static days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  static months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  state = { date: new Date() }

  componentDidMount() {
    this._id = setInterval(() => this.setState({ date: new Date() }), 1e3)
  }

  componentWillUnmount() {
    clearInterval(this._id)
  }

  render() {
    const { date } = this.state
    const mins = date.getMinutes()

    return (
      <div className="w-clock">
        <div className="time">
          {date.getHours()}
          <span className="blink">{':'}</span>
          {mins < 10 ? `0${mins}` : mins}
        </div>
        <div className="date">
          {Clock.days[date.getDay()]}
          {', '}
          {Clock.months[date.getMonth()]} {date.getDate()} {date.getFullYear()}
        </div>
      </div>
    )
  }
}

export default Clock
