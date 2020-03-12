import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import Linkify from 'linkifyjs/react'
import get from 'lodash/get'

const dec = html => {
  const txt = document.createElement('textarea')
  txt.innerHTML = html
  return txt.value
}

class Polochat extends Component {
  state = {
    msgs: [],
    hover: false,
  }

  componentDidMount() {
    this.ws = new WebSocket('wss://www.bitmex.com/realtime?subscribe=chat')

    this.ws.onopen = e => {
      if (e.target.readyState === 1) {
        e.target.send(JSON.stringify({ command: 'subscribe', channel: 1001 }))
      }
    }

    this.ws.onmessage = e => {
      const data = JSON.parse(e.data)
      if (data.table !== 'chat' || get(data, 'data.0.channelID') !== 1) {
        return
      }

      const { id, message, user } = data.data[0]

      if (!message) {
        return
      }

      const msgs = [...this.state.msgs, { id, nick: dec(user), msg: dec(message) }]
      this.setState({ msgs: msgs.length > 50 && !this.state.hover ? msgs.slice(1, 50) : msgs })

      if (!this.state.hover) {
        const div = findDOMNode(this.div) // eslint-disable-line
        div.parentNode.parentNode.scrollTop = div.parentNode.parentNode.scrollHeight
      }
    }
  }

  componentWillUnmount() {
    this.ws.close()
  }

  render() {
    const { msgs } = this.state

    return (
      <div
        ref={e => {
          this.div = e
        }}
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
      >
        {msgs.map(({ id, nick, msg }) => (
          <div key={id}>
            <span className="poulet">{nick} </span>
            <Linkify>{msg}</Linkify>
          </div>
        ))}
      </div>
    )
  }
}

export default Polochat
