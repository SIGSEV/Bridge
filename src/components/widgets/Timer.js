import React, { Component } from 'react'

class Timer extends Component {

  state = { counter: 0 }

  componentWillMount () {
    Notification.requestPermission()
  }

  componentDidUpdate () {
    const { counter } = this.state
    if (counter === 0) {
      const notif = new Notification('Timer finished.')
      clearInterval(this._id)
      setTimeout(() => notif.close(), 5e3)
    }
  }

  increase () {
    const { counter } = this.state
    const mins = Math.floor(counter / 60) + 1
    if (mins >= 100) { return }

    this.setState({ counter: counter + 60 })
    if (counter === 0) {
      this._id = setInterval(::this.decrease, 1e3)
    }
  }

  decrease () {
    const { counter } = this.state
    if (counter <= 0) { return }

    this.setState({ counter: counter - 1 })
  }

  render () {
    const { counter } = this.state

    const mins = Math.floor(counter / 60)
    const secs = counter - (mins * 60)

    return (
      <div className='w-timer'>
        <div onClick={::this.increase} className='counter'>
          {counter <= 60 && (
            <span>
              {counter}
              <span>{'s'}</span>
            </span>
          )}
          {counter > 60 && (
            <span>
              {mins}
              <span>{'m'}</span>
              {secs}
              <span>{'s'}</span>
            </span>
          )}
        </div>
      </div>
    )
  }

}

export default Timer
