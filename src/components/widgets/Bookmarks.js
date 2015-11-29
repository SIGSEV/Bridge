import React, { Component } from 'react'

class Bookmarks extends Component {

  constructor (props) {
    super(props)

    this.state = {
      href: '',
      label: ''
    }
  }

  handleHrefChange (index, e) {
    const href = e.target.value
    const { config } = this.props.data
    const { onSave } = this.props
    config.books[index].href = href
    onSave(config)
  }

  handleLabelChange (index, e) {
    const label = e.target.value
    const { config } = this.props.data
    const { onSave } = this.props
    config.books[index].label = label
    onSave(config)
  }

  handleNewHref (e) {
    const href = e.target.value
    this.setState({ href })
  }

  handleNewLabel (e) {
    const label = e.target.value
    this.setState({ label })
  }

  removeBookmark (index) {
    const { onSave } = this.props
    const { config } = this.props.data
    config.books.splice(index, 1)
    onSave(config)
  }

  createBookmark () {
    const { onSave } = this.props
    const { href, label } = this.state
    const { config } = this.props.data
    config.books.push({ href, label })
    this.setState({ href: '', label: '' })
    onSave(config)
  }

  render () {
    const { edit } = this.props
    const { books } = this.props.data.config
    const { href, label } = this.state
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
                    <input value={book.label} onChange={this.handleLabelChange.bind(this, i)}
                      placeholder='Label (optional)' type='text'/>
                    <i onClick={this.removeBookmark.bind(this, i)} className='ion-ios-trash-outline'/>
                  </div>
                )}
              </div>
            )}
            <div>
              <h3 className='subtitle'>{'Add a new one'}</h3>
              <input value={href} onChange={::this.handleNewHref} type='text'
                placeholder='Link URL'/>
              <input value={label} onChange={::this.handleNewLabel} type='text'
                placeholder='Label (optional)'/>
              <button onClick={::this.createBookmark} disabled={emptyHref} className='btn-advanced'>{'Create'}</button>
            </div>
          </div>
        )}

        {!empty && !edit && (
          <div className='bookmark-list'>
            {books.map((book, i) =>
              <div className='z' key={i}>
                <a href={book.href}>
                  {book.label || book.href}
                </a>
                <a href={book.href} target='_blank'>
                  <i className='ion-android-open'/>
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

}

export default Bookmarks
