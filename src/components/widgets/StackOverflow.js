import React, { Component } from 'react'

class StackOverflow extends Component {

  _navigate (question) {
    window.open(question.link, '_blank')
  }

  saveTag (e) {
    const { onSave, config } = this.props
    const tag = this.refs.text.value

    e.preventDefault()
    onSave({ ...config, tag }, true)
  }

  render () {
    const { edit, data: { config: { tag }, values: { items } } } = this.props

    return (
      <div className='w-stack'>

        {edit && (
          <form onSubmit={::this.saveTag}>
            <input
              defaultValue={tag}
              type='text'
              ref='text'
              placeholder='Tag'
              required />
            <button className='btn btn-icon'>
              <i className='ion-checkmark-circled' />
            </button>
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
