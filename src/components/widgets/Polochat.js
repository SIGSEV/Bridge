import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'

const dec = html => {
  const txt = document.createElement('textarea')
  txt.innerHTML = html
  return txt.value
}

class Polochat extends Component {

  state = {
    msgs: [],
  }

  componentDidMount () {

    this.ws = new WebSocket('wss://api2.poloniex.com')

    this.ws.onopen = e => {
      if (e.target.readyState === 1) {
        e.target.send(JSON.stringify({ command: 'subscribe', channel: 1001 }))
      }
    }

    this.ws.onmessage = e => {
      const data = JSON.parse(e.data)
      if (data[0] !== 1001) { return }
      const [type, time, nick, msg] = data // eslint-disable-line

      if (!msg) { return }

      const msgs = [...this.state.msgs.slice(0, 50), { nick: dec(nick), msg: dec(msg) }]
      this.setState({ msgs })

      const node = findDOMNode(this.end)
      node.scrollIntoView({ behavior: 'smooth' })
    }

  }

  componentWillUnmount () {
    this.ws.close()
  }

  render () {
    const { msgs } = this.state

    return (
      <div>

        {msgs.map((m, i) => (
          <div key={i}>
            <span className='poulet'>{m.nick}</span> {m.msg}
          </div>
        ))}

        <div style={{ float: 'left', clear: 'both' }}
          ref={e => { this.end = e }} />
      </div>
    )
  }

}

export default Polochat
