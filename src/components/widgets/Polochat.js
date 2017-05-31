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

      const msgs = [...this.state.msgs, { nick: dec(nick), msg: dec(msg) }]
      this.setState({ msgs: msgs.length > 50 ? msgs.slice(1, 50) : msgs })

      const div = findDOMNode(this.div)
      div.parentNode.parentNode.scrollTop = div.parentNode.parentNode.scrollHeight
    }

  }

  componentWillUnmount () {
    this.ws.close()
  }

  render () {
    const { msgs } = this.state

    return (
      <div ref={e => { this.div = e }} className='z'>

        {!msgs.length && <div>{'Loading messages...'}</div>}

        <div>
          {msgs.map((m, i) => (
            <div key={i}>
              <span className='poulet'>{m.nick}</span> {m.msg}
            </div>
          ))}
        </div>

      </div>
    )
  }

}

export default Polochat
