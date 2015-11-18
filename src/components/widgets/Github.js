import React, { Component } from 'react'

class Github extends Component {

  render () {
    const { values } = this.props.data
    return (
      <div>
        {values.map((repo, i) =>

          <a key={i}
            className='github-repo za' href={`https://github.com${repo.url}`}
            target='_blank'>

            <div className='github-stars'>
              <i className='ion-ios-star'/>
              <span>{repo.today}</span>
            </div>

            <span className='github-name'>{repo.name}</span>

          </a>
        )}
      </div>
    )
  }

}

export default Github
