import React, { Component } from 'react'

class Dribbble extends Component {

  render () {
    const { data } = this.props
    const { values, style } = data
    return (
      <div className='Widget w-dribbble'>
        <img width={style.width}
          src={values.images.normal || values.images.teaser}/>
        <div className='z dribbble-overlay'>
          <a href={values.html_url} target='_blank'>
            {values.title}
          </a>
          <div>
            by <a href={values.user.html_url} target='_blank'>{values.user.name}</a>
          </div>
        </div>
      </div>
    )
  }

}

export default Dribbble
