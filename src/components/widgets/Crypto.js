import React, { Component } from 'react'

import BtcIcon from 'assets/btc-symbol.svg'
import EthIcon from 'assets/eth-symbol.svg'
import UsdIcon from 'assets/usd-symbol.svg'

import TextInput from 'components/TextInput'

const icons = {
  btc: <BtcIcon width={20} height={20} />,
  eth: <EthIcon width={20} />,
  usd: <UsdIcon width={20} />,
}

const format = (value, type) => {
  const s = String(value)

  if (value < 0.0001 && type === 'btc') {
    return `${(value * 1e8).toFixed(0)}s`
  } else if (value < 0.01) {
    return s.substr(0, 7)
  } else if (value >= 100) {
    return value.toFixed(0)
  }

  return s.substr(0, 5)
}

class Crypto extends Component {
  saveCoin = e => {
    const { onSave, data: { config } } = this.props
    const coin = this.refs.coin.getWrappedInstance().getText()
    const preferred = this.refs.preferred.getWrappedInstance().getText()

    e.preventDefault()
    onSave({ ...config, preferred, coin }, true)
  }

  render() {
    const { edit } = this.props
    const { config: { coin, preferred }, values } = this.props.data

    const direction = values.percent_change_24h.startsWith('-') ? 'down' : 'up'
    const price = Number(values[`price_${preferred}`])
    const isSats = preferred === 'btc' && price < 0.0001

    return (
      <div className="w-crypto">
        {edit ? (
          <form onSubmit={this.saveCoin}>
            <h3>{'Edit coin'}</h3>
            <TextInput ref="coin" defaultValue={coin} placeholder="Coin name" />
            <TextInput ref="preferred" defaultValue={preferred} placeholder="usd/btc/eth" />
            <button className="xem" />
          </form>
        ) : (
          <div className="z">
            <div className="crypto--title">
              <span className="selectable">{format(price, preferred)}</span>
              {!isSats && icons[preferred]}
              <a href={`https://coinmarketcap.com/currencies/${values.id}`}>{values.symbol}</a>
            </div>

            <div className="crypto--values">
              <span className="crypto--rank">
                <i className="ion-ios-star" />
                {values.rank}
              </span>
              <span className="selectable">
                <i className={`ion-arrow-graph-${direction}-right`} />
                <span>
                  {values.percent_change_24h}
                  {'%'}
                </span>
              </span>
            </div>

            <div className="crypto--values">
              <span className="selectable">
                <i className="ion-stats-bars" />
                {Number(values['24h_volume_usd']).toLocaleString()}
                {' $'}
              </span>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default Crypto
