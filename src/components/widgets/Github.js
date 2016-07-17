import React, { Component } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'

import { toggleLock } from 'actions/mode'
import languages from 'data/languages'

@connect()
class Github extends Component {

  saveLanguage (language) {
    const { onSave } = this.props
    const { config } = this.props.data
    this.props.dispatch(toggleLock(false))
    onSave({ ...config, language }, true)
  }

  blur () {
    this.props.dispatch(toggleLock(false))
  }

  focus () {
    this.props.dispatch(toggleLock(true))
  }

  render () {
    const { edit } = this.props
    const { values, config } = this.props.data

    return (
      <div className='w-github'>

        {edit && (
          <div>
            <h3>{'Edit your language'}</h3>
            <Select
              value={config.language}
              options={languages}
              onChange={::this.saveLanguage}
              onBlur={::this.blur}
              onFocus={::this.focus}
              ref='select' />
          </div>
        )}

        {!edit && values.map((repo, i) =>

          <a key={i}
            className='github-repo za' href={`https://github.com${repo.url}`}
            target='_blank'>

            <span className='github-name'>{repo.name}</span>

            <div className='github-stars'>
              <span>{repo.today}</span>
              <i className='ion-ios-star'/>
            </div>

          </a>
        )}
      </div>
    )
  }

}

export default Github
