import React, { Component } from 'react'
import { omit } from 'lodash'
import { connect } from 'react-redux'

import { toggleLock } from 'actions/mode'

@connect(null, null, null, { withRef: true })
class TextInput extends Component {

  static defaultprops = {
    required: true,
  }

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
      <input
        type='text'
        ref='me'
        onFocus={::this.focus}
        onBlur={::this.blur}
        {...omit(this.props, ['dispatch'])}
        required={this.props.required} />
    )
  }

}

export default TextInput
