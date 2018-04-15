import React, { Component } from 'react'

class Dribbble extends Component {
  render() {
    const { username, userUrl, img, url, title, likes } = this.props.data.values

    return (
      <div className="w-dribbble" style={{ backgroundImage: `url(${img})` }}>
        <div className="z dribbble-overlay">
          <a href={`https://dribbble.com${url}`}>{title}</a>

          <div className="likes">
            <i className="ion-heart" />
            {likes}
          </div>

          <div className="usr">
            {'by '}
            <a href={`https://dribbble.com${userUrl}`}>{username}</a>
          </div>
        </div>
      </div>
    )
  }
}

export default Dribbble
