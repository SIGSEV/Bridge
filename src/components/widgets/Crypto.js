import React, { Component } from 'react'
import { connect } from 'react-redux'

import { toggleLock } from 'actions/mode'
import TextInput from 'components/TextInput'

@connect(null, { toggleLock })
class Crypto extends Component {

  state = { now: new Date() }

  componentWillMount () {
    this._int = setInterval(() => this.setState({ now: new Date() }), 1E3)
  }

  componentWillUnmount () {
    clearInterval(this._int)
  }

  getDiff = date => {
    const { now } = this.state
    const diff = Math.abs(now.getTime() - date.getTime())
    const secs = Math.ceil(diff / 1000)
    if (secs === 1) { return `${secs} sec` }
    return `${secs} secs`
  }

  savePair = e => {
    const { toggleLock, onSave, data: { config } } = this.props
    const pair = this.refs.text.getWrappedInstance().getText()

    e.preventDefault()
    toggleLock(false)
    onSave({ ...config, pair }, true)
  }

  render () {
    const { edit } = this.props
    const { values, config: { pair } } = this.props.data
    const timestamp = new Date(values.timestamp)

    return (
      <div className='w-crypto'>

        {edit ? (
          <form onSubmit={this.savePair}>
            <h3>{'Edit pair'}</h3>
            <div className='y'>
              <TextInput ref='text' defaultValue={pair} placeholder='Pair name' />
              <button className='btn btn-icon'>
                <i className='ion-checkmark-circled' />
              </button>
            </div>
          </form>
        ) : (
          <div className='z'>
            <div className='crypto--title'>
              <span>{values.last}</span>
              <span>{pair}</span>
            </div>
            <div className='crypto--update'>
              {`updated ${this.getDiff(timestamp)} ago`}
            </div>
            <div className='crypto--values'>
              <span>
                <i className='ion-arrow-graph-up-right'/>
                {values.high}
              </span>
              <span>
                <i className='ion-arrow-graph-down-right'/>
                {values.low}
              </span>
            </div>
            <div className='crypto--values'>
              <span>
                <i className='ion-stats-bars'/>
                {values.volume}
              </span>
            </div>
          </div>
        )}

      </div>
    )
  }

}

export default Crypto
