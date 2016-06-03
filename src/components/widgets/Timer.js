import React, { Component } from 'react'

class Timer extends Component {

  state = { counter: 0, timing: false }

  componentWillMount () {
    Notification.requestPermission()
  }

  componentDidUpdate () {
    const { counter, timing } = this.state
    if (counter === 0 && timing) {
      const notif = new Notification('Bridge', {
        body: 'Timer finished.',
        icon: 'https://avatars2.githubusercontent.com/u/11440121?v=3&s=200'
      })
      clearInterval(this._id)
      setTimeout(() => notif.close(), 5e3)
      this.setState({ timing: false })
    }
  }

  increase () {
    const { counter } = this.state
    const mins = Math.floor(counter / 60) + 1
    if (mins >= 100) { return }

    this.setState({ counter: counter + 60, timing: true })
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
