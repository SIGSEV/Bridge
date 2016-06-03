import React, { Component } from 'react'
import { connect } from 'react-redux'

import { toggleLock } from 'actions/mode'

@connect(null, null, null, { withRef: true })
class TextInput extends Component {

  focus () {
    this.props.dispatch(toggleLock(true))
  }

  blur () {
    this.props.dispatch(toggleLock(false))
  }

  getText () {
    return this.refs.me.value
  }

  reset () {
    this.refs.me.value = ''
  }

  render () {
    return (
      <input type='text'
        ref='me'
        onFocus={::this.focus}
        onBlur={::this.blur}
        {...this.props}
        required />
    )
  }

}

export default TextInput
