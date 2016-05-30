import React, { Component } from 'react'

class StackOverflow extends Component {

  constructor (props) {
    super(props)
    const { tag } = this.props.data.config
    this.state = { tag }
  }

  _navigate (question) {
    window.open(question.link, '_blank')
  }

  updateTag ({ target: { value: tag } }) {
    this.setState({ tag })
  }

  saveTag () {
    const { onSave, config } = this.props
    const { tag } = this.state
    onSave({ ...config, tag }, true)
  }

  render () {
    const { edit, data: { values: { items } } } = this.props
    const { tag } = this.state

    return (
      <div className='w-stack'>

        {edit && (
          <div>
            <input onChange={::this.updateTag} type='text' value={tag}
              placeholder={'Tag'} />
            <button onClick={::this.saveTag} className='btn btn-icon'>
              <i className='ion-checkmark-circled' />
            </button>
          </div>
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
