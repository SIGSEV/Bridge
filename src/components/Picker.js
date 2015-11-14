import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'

class Picker extends Component {

  constructor (props) {
    super(props)
  }

  componentWillEnter (done) {
    const drop = findDOMNode(this)
    const { content } = this.refs
    new TimelineMax()
      .from(drop, 0.1, { opacity: 0 })
      .from(content, 0.2, { opacity: 0, scale: 0.9 }, '-=0.05')
      .addCallback(done)
  }

  componentWillLeave (done) {
    const drop = findDOMNode(this)
    const { content } = this.refs
    new TimelineMax()
      .to(content, 0.2, { opacity: 0, scale: 0.9 }, '-=0.05')
      .to(drop, 0.1, { opacity: 0 })
      .addCallback(done)
  }

  render () {
    return (
      <div className='Picker'>
        <section ref='content'>

          <div className='box-container'>
            <div className='preview'>
            </div>
            <h1>Weather</h1>
          </div>

          <div className='box-container'>
            <div className='preview'>
            </div>
            <h1>StackOverflow</h1>
          </div>

          <div className='box-container'>
            <div className='preview'>
            </div>
            <h1>GitHub</h1>
          </div>

        </section>
      </div>
    )
  }

}

export default Picker
