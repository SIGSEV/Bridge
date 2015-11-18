import React, { Component } from 'react'

class Rss extends Component {

  render () {
    const { values } = this.props.data
    return (
      <div className='w-rss'>

        <h3 className='rss--main-title'>{values.title}</h3>

        {values.entries.map((entry, i) =>
          <div key={i} className='rss--entry'>
            <a href={entry.link} target='_blank' key={i}>
              <div>{entry.title}</div>
            </a>
            <div className='rss--meta'>
              <span>{entry.author}</span>
              <span>{entry.publishedDate}</span>
            </div>
          </div>
        )}

      </div>
    )
  }

}

export default Rss
