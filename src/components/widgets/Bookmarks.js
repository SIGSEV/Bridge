import React, { Component } from 'react'

import getDomain from 'helpers/get-domain'

class Bookmarks extends Component {

  constructor (props) {
    super(props)
    this.state = { href: '' }
  }

  handleHrefChange (index, { target: { value: href } }) {
    const { onSave, data: { config } } = this.props
    const domain = getDomain(href)
    const item = { ...config.books[index], href, domain }

    onSave({
      ...config,
      books: [
        ...config.books.slice(0, index),
        item,
        ...config.books.slice(index + 1),
      ]
    })
  }

  handleNewHref ({ target: { value: href } }) {
    this.setState({ href })
  }

  removeBookmark (index) {
    const { onSave, data: { config } } = this.props

    onSave({
      books: [
        ...config.books.slice(0, index),
        ...config.books.slice(index + 1)
      ]
    })
  }

  createBookmark () {
    const { onSave, data: { config } } = this.props
    const { href: value } = this.state
    const href = value.indexOf('//') === -1 ? `http://${value}` : value
    const domain = getDomain(href)

    this.setState({ href: '' })
    onSave({ ...config, books: [...config.books, { href, domain }] })
  }

  render () {
    const { edit, data: { config: { books } } } = this.props
    const { href } = this.state
    const empty = !books.length
    const emptyHref = !href.length

    return (
      <div className='w-bookmarks'>
        {(empty || edit) && (
          <div>
            {!empty && (
              <div className='bookmark-edit-list'>
                <h3 className='subtitle'>My bookmarks</h3>
                {books.map((book, i) =>
                  <div className='z' key={i}>
                    <input value={book.href} onChange={this.handleHrefChange.bind(this, i)}
                      placeholder='Link URL' type='text'/>
                    <button onClick={this.removeBookmark.bind(this, i)} className='btn btn-icon'>
                      <i className='ion-ios-trash-outline'/>
                    </button>
                  </div>
                )}
              </div>
            )}
            <div className='bookmark-new'>
              <h3 className='subtitle'>{'Add a new one'}</h3>
              <input value={href} onChange={::this.handleNewHref} type='text'
                placeholder='Url' />
              <button onClick={::this.createBookmark} disabled={emptyHref} className='btn btn-icon'>
                <i className='ion-plus-circled' />
              </button>
            </div>
          </div>
        )}

        {!empty && !edit && (
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
