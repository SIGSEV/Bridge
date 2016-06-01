import React, { Component } from 'react'

class Rss extends Component {

  saveFeed (e) {
    const { onSave, data: { config } } = this.props
    const feed = this.refs.text.value

    e.preventDefault()
    onSave({ ...config, feed }, true)
  }

  render () {
    const { edit } = this.props
    const { values, config: { feed } } = this.props.data

    return (
      <div className='w-rss'>

        {(edit || !feed) && (
          <form onSubmit={::this.saveFeed}>
            <h3 className='rss--main-title'>RSS</h3>
            <input
              defaultValue={feed}
              type='text'
              ref='text'
              required
              placeholder='Feed url' />
            <button className='btn-oe'>Save</button>
          </form>
        )}

        {(!edit && feed) && (
          <div>
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
        )}

      </div>
    )
  }

}

export default Rss
