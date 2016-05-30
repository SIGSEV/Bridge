import React, { Component } from 'react'

class Rss extends Component {

  constructor (props) {
    super(props)
    const { feed } = this.props.data.config
    this.state = { feed }
  }

  updateFeed ({ target: { value: feed } }) {
    this.setState({ feed })
  }

  saveFeed () {
    const { onSave, data: { config } } = this.props
    const { feed } = this.state
    onSave({ ...config, feed }, true)
  }

  render () {
    const { edit } = this.props
    const { values, config } = this.props.data

    return (
      <div className='w-rss'>

        {(edit || !config.feed) && (
          <div>
            <h3 className='rss--main-title'>RSS</h3>
            <input value={config.feed} type='text'
              onChange={::this.updateFeed}
              placeholder='Feed url' />
            <button onClick={::this.saveFeed} className='btn-oe'>Save</button>
          </div>
        )}

        {(!edit && config.feed) && (
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
