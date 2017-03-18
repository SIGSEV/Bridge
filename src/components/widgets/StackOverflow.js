import React, { Component } from 'react'

import TextInput from 'components/TextInput'

class StackOverflow extends Component {

  _navigate (question) {
    window.open(question.link, '_blank')
  }

  saveTag (e) {
    const { onSave, config } = this.props
    const tag = this.refs.text.getWrappedInstance().getText()

    e.preventDefault()
    onSave({ ...config, tag }, true)
  }

  render () {
    const { edit, data: { config: { tag }, values: { items } } } = this.props

    return (
      <div className='w-stack'>

        {edit && (
          <form onSubmit={::this.saveTag}>
            <h3>{'Edit your tag'}</h3>
            <TextInput defaultValue={tag} ref='text' placeholder='Tag' />
          </form>
        )}

        {!edit && items.map((question, i) => (
          <div className='question za' key={i} onClick={this._navigate.bind(this, question)}>

            <div className='side'>
              <div className='val'>
                {`${question.score}`}
                <i className='ion-arrow-graph-up-right' />
              </div>
              <div className='val'>
                {`${question.view_count}`}
                <i className='ion-eye' />
              </div>
            </div>

            <div className='body'>
              <span dangerouslySetInnerHTML={{ __html: question.title }} />
              <div className='tags'>
                {question.tags.map((tag, i) => (
                  <div key={i} className='tag'>
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
