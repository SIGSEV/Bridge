import React, { Component } from 'react'

class Slider extends Component {

  componentWillLeave (done) {
    const { container } = this.refs
    new TimelineMax()
      .to(container, 0.2, { opacity: 0 })
      .to(container, 0.3, { height: 0 })
      .addCallback(done)
  }

  componentWillEnter (done) {
    const { container } = this.refs
    new TimelineMax()
      .set(container, { opacity: 0 })
      .from(container, 0.2, { height: 0 })
      .to(container, 0.1, { opacity: 1 })
      .addCallback(done)
  }

  render () {
    return (
      <div ref='container'>
        {this.props.children}
      </div>
    )
  }

}

export default Slider
