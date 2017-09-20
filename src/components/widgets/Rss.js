import React, { Component } from 'react'

import TextInput from 'components/TextInput'

class Rss extends Component {

  saveFeed (e) {
    const { onSave, data: { config } } = this.props
    const feed = this.refs.text.getWrappedInstance().getText()

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
            <h3>{'RSS'}</h3>
            <TextInput ref='text' defaultValue={feed} placeholder='Feed url' />
            <button className='xem' />
          </form>
        )}

        {(!edit && feed && values) && (
          <div>
            <h3>{values.title}</h3>

            {values.entries.map((entry, i) =>
              <div key={i} className='rss--entry'>
                <a href={entry.link} key={i}>
                  <div>{entry.title}</div>
                </a>
                <div className='rss--meta'>
                  {entry.comments && <a href={entry.comments} target='_blank'><i className='ion-chatbubbles' /></a>}
                  <span>{entry.author}</span>
                  <span>{entry.pubDate}</span>
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
