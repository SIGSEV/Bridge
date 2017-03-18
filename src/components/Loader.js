import React, { Component } from 'react'

class Loader extends Component {

  static defaultProps = {
    className: ''
  }

  render () {
    const { className } = this.props

    return (
      <div className={`Loader ${className}`}>
        <i className='ion-radio-waves' />
      </div>
    )
  }

}

export default Loader
