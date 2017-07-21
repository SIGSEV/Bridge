import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'
import { NativeTypes } from 'react-dnd-html5-backend'

import widgets from 'widgets'
import { uploadFiles } from 'actions/widgets'
import TextInput from 'components/TextInput'

const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

const bts = b => {
  if (b === 0) { return '0B' }
  const i = Math.floor(Math.log(b) / Math.log(1E3))
  return `${parseFloat((b / Math.pow(1E3, i)).toFixed(2))}${sizes[i]}`
}

@DropTarget(NativeTypes.FILE, {
  drop: (props, monitor) => {
    const { files } = monitor.getItem()
    const { data: { config } } = props
    if (!config.host) { return }

    uploadFiles(files, config)
  }
}, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver() && monitor.canDrop(),
}))
class Deluge extends Component {

  saveServer = e => {
    const { onSave, data: { config } } = this.props
    const host = this.refs.host.getWrappedInstance().getText()
    const pass = this.refs.pass.getWrappedInstance().getText()

    e.preventDefault()
    onSave({ ...config, host, pass }, true)
  }

  render () {
    const { edit, connectDropTarget, isOver } = this.props
    const { values, config: { host, pass } } = this.props.data

    const torrents = values && Object.keys(values.torrents)
      .map(id => ({ id, ...values.torrents[id] }))
      .sort((a, b) => b.time_added - a.time_added)

    const out = (
      <div className='w-deluge'>

        {isOver ? (
          <div style={widgets.Deluge.style} className='z fg'>
            <i style={{ marginRight: '0.5rem', fontSize: '1.5rem' }} className='ion-document' />
            {'Drop your torrent'}
          </div>
        ) : (edit || !host) ? (
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

    return connectDropTarget(out)

  }

}

export default Deluge
