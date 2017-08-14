import React, { Component } from 'react'

import TextInput from 'components/TextInput'

class Crypto extends Component {

  getDiff = () => {
    const { now, data: { values: { timestamp } } } = this.props
    const diff = Math.abs(now - timestamp)
    const secs = Math.ceil(diff / 1000)
    return secs
  }

  savePair = e => {
    const { onSave, data: { config } } = this.props
    const pair = this.refs.text.getWrappedInstance().getText()

    e.preventDefault()
    onSave({ ...config, pair }, true)
  }

  render () {
    const { edit } = this.props
    const { config: { pair }, values } = this.props.data

    return (
      <div className='w-crypto'>

        {edit ? (
          <form onSubmit={this.savePair}>
            <h3>{'Edit pair'}</h3>
            <TextInput ref='text' defaultValue={pair} placeholder='Pair name' />
            <button className='xem' />
          </form>
        ) : (
          <div className='z'>
            <div className='crypto--title'>
              <span className='selectable'>{values.last}</span>
              <a href={values.url}>{pair}</a>
            </div>
            <div className='crypto--update'>
              {`updated ${this.getDiff() === 1 ? '1 sec' : `${this.getDiff()} secs`} ago`}
            </div>
            <div className='crypto--values'>
              <span className='selectable'>
                <i className='ion-arrow-graph-up-right'/>
                {values.high}
              </span>
              <span className='selectable'>
                <i className='ion-arrow-graph-down-right'/>
                {values.low}
              </span>
            </div>
            <div className='crypto--values'>
              <span className='selectable'>
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
