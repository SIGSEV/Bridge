import React, { Component } from 'react'

import TextInput from 'components/TextInput'

class StackOverflow extends Component {
  _navigate(question) {
    window.open(question.link, '_blank')
  }

  saveTag(e) {
    const { onSave, config } = this.props
    const tag = this.refs.tag.getWrappedInstance().getText()
    const extra = this.refs.extra.getWrappedInstance().getText()

    e.preventDefault()
    onSave({ ...config, tag, extra }, true)
  }

  render() {
    const { edit, data: { config: { tag, extra }, values: { items } } } = this.props

    return (
      <div className="w-stack">
        {edit && (
          <form onSubmit={::this.saveTag}>
            <h3>{'Edit your tag'}</h3>
            <TextInput defaultValue={tag} ref="tag" placeholder="Tag" />
            <h3>{'Extra params'}</h3>
            <TextInput defaultValue={extra} ref="extra" placeholder="Tag" />
            <button className="xem" />
          </form>
        )}

        {!edit &&
          items.map(question => (
            <div
              className="question za"
              key={question.link}
              onClick={this._navigate.bind(this, question)}
            >
              <div className="side">
                <div className="val">
                  {`${question.score}`}
                  <i className="ion-arrow-graph-up-right" />
                </div>
                <div className="val">
                  {`${question.view_count}`}
                  <i className="ion-eye" />
                </div>
              </div>

              <div className="body">
                <span dangerouslySetInnerHTML={{ __html: question.title }} />
                <div className="tags">
                  {question.tags.map(tag => (
                    <div key={tag} className="tag">
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
      </div>
    )
  }
}

export default StackOverflow
