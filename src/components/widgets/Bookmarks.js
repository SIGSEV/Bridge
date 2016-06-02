import React, { Component } from 'react'

import getDomain from 'helpers/get-domain'

class Bookmarks extends Component {

  removeBookmark (index) {
    const { onSave, data: { config } } = this.props

    onSave({
      books: [
        ...config.books.slice(0, index),
        ...config.books.slice(index + 1)
      ]
    })
  }

  changeBookmark (index, { target: { value: href } }) {
    const { onSave, data: { config } } = this.props
    const domain = getDomain(href)

    const item = { href, domain }
    onSave({
      books: [
        ...config.books.slice(0, index),
        item,
        ...config.books.slice(index + 1)
      ]
    })
  }

  createBookmark (e) {
    const { onSave, data: { config } } = this.props
    const { value } = this.refs.text

    // Add basic http prefix if no url-like pattern is found
    const href = value.indexOf('//') === -1 ? `http://${value}` : value
    const domain = getDomain(href)

    e.preventDefault()
    this.refs.text.value = ''
    onSave({ ...config, books: [...config.books, { href, domain }] })
  }

  render () {
    const { edit, data: { config: { books } } } = this.props
    const empty = !books.length

    return (
      <div className='w-bookmarks'>
        {edit && (
          <div>
            {!empty && (
              <div className='bookmark-edit-list'>
                <h3>{'My bookmarks'}</h3>
                {books.map((book, i) =>
                  <div className='fac' key={i}>
                    <input
                      value={book.href}
                      onChange={this.changeBookmark.bind(this, i)}
                      placeholder='Link URL'
                      type='text' />
                    <button onClick={this.removeBookmark.bind(this, i)} className='btn btn-icon'>
                      <i className='ion-ios-trash-outline'/>
                    </button>
                  </div>
                )}
              </div>
            )}
            <form onSubmit={::this.createBookmark} className='bookmark-new'>
              <h3>{'Add a new one'}</h3>
              <input
                ref='text'
                type='text'
                placeholder='Url'
                required />
              <button className='btn btn-icon'>
                <i className='ion-plus-circled' />
              </button>
            </form>
          </div>
        )}

        {!edit && (
          <div className='bookmark-list'>
            {books.map((book, i) =>
              <a href={book.href} key={i}>
                <img src={`http://www.google.com/s2/favicons?domain=${book.domain}`} alt={book.href} title={book.href} />
              </a>
            )}
          </div>
        )}
      </div>
    )
  }

}

export default Bookmarks
