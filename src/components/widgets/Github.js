import React, { Component } from 'react'

class Github extends Component {

  render () {
    const { data } = this.props.data
    console.log(data)
    return (
      <div className='Widget'>
      {data.map((repo, i) =>
        <div key={i}>
          <a className='widget-link' href={`https://github.com${repo.url}`} target='_blank'>{repo.name}</a>
          <span>{' ' + repo.today}</span>
        </div>
      )}
      </div>
    )
  }

}

export default Github
