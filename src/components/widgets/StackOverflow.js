import React, { Component } from 'react'

class StackOverflow extends Component {

  _navigate (question) {
    window.open(question.link, '_blank')
  }

  render () {
    const { items } = this.props.data.values
    return (
      <div className='Widget w-stack'>
        {items.map((question, i) => (

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
