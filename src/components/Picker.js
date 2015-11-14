import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'

class Picker extends Component {

  constructor (props) {
    super(props)
  }

  componentWillEnter (done) {
    const drop = findDOMNode(this)
    const { section } = this.refs
    new TimelineMax()
      .from(drop, 0.1, { opacity: 0 })
      .from(section, 0.2, { opacity: 0, scale: 0.9 }, '-=0.05')
      .addCallback(done)
  }

  componentWillLeave (done) {
    const drop = findDOMNode(this)
    const { section } = this.refs
    new TimelineMax()
      .to(section, 0.2, { opacity: 0, scale: 0.9 }, '-=0.05')
      .to(drop, 0.1, { opacity: 0 })
      .addCallback(done)
  }

  render () {
    console.log(this.props)
    return (
      <div className='Picker'>
        <section ref='section'>
          {'Pickers'}
        </section>
      </div>
    )
  }

}

export default Picker
