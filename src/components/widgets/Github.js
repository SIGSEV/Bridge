import React, { Component } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'

import languages from 'data/languages'
import { toggleLock } from 'actions/mode'

@connect(null, { toggleLock })
class Github extends Component {

  saveLanguage (data) {
    const { onSave, data: { config } } = this.props
    const language = data && data.value

    onSave({ ...config, language }, true)
  }

  blur () {
    this.props.toggleLock(false)
  }

  focus () {
    this.props.toggleLock(true)
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

          <a key={i} className='github-repo za' href={`https://github.com${repo.url}`}>

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
