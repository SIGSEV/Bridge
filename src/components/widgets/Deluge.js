import React, { Component } from 'react'

import TextInput from 'components/TextInput'

const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

const bts = b => {
  if (b === 0) { return '0B' }
  const i = Math.floor(Math.log(b) / Math.log(1E3))
  return `${parseFloat((b / Math.pow(1E3, i)).toFixed(2))}${sizes[i]}`
}

class Deluge extends Component {

  saveServer = e => {
    const { onSave, data: { config } } = this.props
    const host = this.refs.host.getWrappedInstance().getText()
    const pass = this.refs.pass.getWrappedInstance().getText()

    e.preventDefault()
    onSave({ ...config, host, pass }, true)
  }

  render () {
    const { edit } = this.props
    const { values, config: { host, pass } } = this.props.data

    const torrents = values && Object.keys(values.torrents)
      .map(id => ({ id, ...values.torrents[id] }))
      .sort((a, b) => b.time_added - a.time_added)

    return (
      <div className='w-deluge'>

        {(edit || !host) ? (
          <form onSubmit={this.saveServer}>
            <h3>{'Server infos'}</h3>

            <TextInput
              ref='host'
              defaultValue={host}
              placeholder='Hostname' />

            <TextInput
              ref='pass'
              defaultValue={pass}
              placeholder='Password'
              required={false} />

            <button className='xem' />
          </form>
        ) : (
          <div>

            <div className='stats'>
              <span>
                <i className='ion-arrow-down-c' />
                {bts(values.stats.download_rate)}
              </span>
              <span>
                <i className='ion-arrow-up-c' />
                {bts(values.stats.upload_rate)}
              </span>
            </div>

            <div className='list'>
              {torrents.map(torrent => (
                <div className={`torrent ${torrent.state}`} key={torrent.id}>
                  <div>
                    <span title={torrent.name} className='name'>{torrent.name}</span>
                    <div className='nfs'>
                      <span>
                        <i className={torrent.state === 'Seeding' ? 'ion-arrow-up-c' : 'ion-arrow-down-c'} />
                        {bts(torrent.state === 'Seeding' ? torrent.upload_payload_rate : torrent.download_payload_rate)}
                      </span>
                      <span>{torrent.ratio.toFixed(2)}</span>
                    </div>
                  </div>
                  <progress value={torrent.progress} max='100' />
                </div>
              ))}
            </div>

          </div>
        )}

      </div>
    )
  }

}

export default Deluge
