import React, { Component } from 'react'
import getAssetImage from 'cryptoicons-cdn'

import BtcIcon from 'assets/btc-symbol.svg'
import EthIcon from 'assets/eth-symbol.svg'
import UsdIcon from 'assets/usd-symbol.svg'

import TextInput from 'components/TextInput'

import abbrNumber from 'fn/abbrNumber'

const icons = {
  btc: <BtcIcon width={20} height={20} fill="#bababa" />,
  eth: <EthIcon width={20} fill="#bababa" />,
  usd: <UsdIcon width={20} fill="#bababa" />,
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

    const direction = values.price_change_percentage_24h < 0 ? 'down' : 'up'
    const price = values.current_price
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
              <a href={`https://coinmarketcap.com/currencies/${values.id}`}>
                <img src={getAssetImage(values.symbol.toUpperCase(), 'dark')} width={20} />
              </a>
              <span className="selectable">{format(price, preferred)}</span>
              {!isSats && icons[preferred]}
            </div>

            <div className="crypto--values">
              <span className="crypto--rank">
                <i className="ion-ios-star" />
                {values.market_cap_rank}
              </span>
              <span className={`selectable crypto--color-${direction}`}>
                <i className={`ion-arrow-graph-${direction}-right`} />
                <span>
                  {values.price_change_percentage_24h.toFixed(1)}
                  {'%'}
                </span>
              </span>
            </div>

            <div className="crypto--values">
              <span className="selectable">
                <i className="ion-android-globe" />
                {'$'}
                {abbrNumber(values.usdMc)}
              </span>

              <span className="selectable">
                <i className="ion-stats-bars" />
                {'$'}
                {abbrNumber(values.usdVolume)}
              </span>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default Crypto
