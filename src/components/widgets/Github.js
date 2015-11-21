import React, { Component } from 'react'
import Select from 'react-select'

import languages from 'data/languages'

class Github extends Component {

  componentDidUpdate () {
    const { select } = this.refs
    if (select) { select.focus() }
  }

  saveLanguage (language) {
    const { onSave } = this.props
    const { config } = this.props.data
    onSave({ ...config, language }, true)
  }

  render () {
    const { edit } = this.props
    const { values, config } = this.props.data

    return (
      <div className='w-github'>

        {edit && (
          <div>
            <Select value={config.language} options={languages}
              onChange={this.saveLanguage.bind(this)} ref='select'/>
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
