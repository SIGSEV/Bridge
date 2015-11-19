import React, { Component } from 'react'

class Github extends Component {

  render () {
    const { values } = this.props.data
    return (
      <div className='w-github'>
        {values.map((repo, i) =>

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
