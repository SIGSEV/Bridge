import React, { Component } from 'react'

class Github extends Component {

  render () {
    const { data } = this.props
    const { values, style } = data
    return (
      <div className='Widget' style={style}>
      {values.map((repo, i) =>
        <a className='github-repo za' href={`https://github.com${repo.url}`}
          key={i} target='_blank'>
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
