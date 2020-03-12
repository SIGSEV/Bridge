import React, { Component } from 'react'
import getCryptoIcon from 'cryptoicons-cdn'

import TextInput from 'components/TextInput'

import abbrNumber from 'fn/abbrNumber'

const icons = {
  btc: (
    <svg
      version="1.1"
      x="0px"
      y="0px"
      width={20}
      height={20}
      viewBox="0 0 207.583 207.583"
      enableBackground="new 0 0 207.583 207.583"
    >
      <g>
        <path
          fill="red"
          d="M85.223,106.781v17.905h27.793v12.828H85.223v17.994h25.922c8.73,0,15.174-1.99,19.33-5.969
      c4.217-4.038,6.326-10.186,6.326-18.439c0-8.314-2.109-14.432-6.326-18.352c-4.156-3.979-10.6-5.968-19.33-5.968H85.223
       M85.223,52.085v40.086h23.963c7.898,0,13.777-1.633,17.637-4.899c3.92-3.326,5.88-8.374,5.881-15.144
      c0-6.71-1.961-11.729-5.881-15.055c-3.859-3.326-9.738-4.988-17.637-4.988H85.223 M69.01,37.297h41.333
      c12.353,0,21.854,2.851,28.507,8.552c6.71,5.701,10.065,13.808,10.065,24.319c0,8.137-1.722,14.61-5.167,19.42
      c-3.385,4.811-8.403,7.81-15.055,8.997c8.018,1.9,14.223,5.88,18.618,11.937c4.395,5.998,6.592,13.511,6.593,22.537
      c0,11.878-3.653,21.053-10.957,27.526c-7.246,6.474-17.58,9.71-31.001,9.71H69.01v-32.781H53.688v-12.828H69.01V37.297"
        />
      </g>
    </svg>
  ),
  eth: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width={20}>
      <g id="_11" data-name="11">
        <path
          fill="red"
          d="M761.52,232.35h-499a30.66,30.66,0,1,1,0-61.32h499a30.66,30.66,0,1,1,0,61.32Z"
        />
        <path
          fill="red"
          d="M710.34,526.66H313.66a30.66,30.66,0,1,1,0-61.32H710.34a30.66,30.66,0,1,1,0,61.32Z"
        />
        <path
          fill="red"
          d="M774.32,853H249.68a30.66,30.66,0,0,1,0-61.32H774.32a30.66,30.66,0,0,1,0,61.32Z"
        />
      </g>
    </svg>
  ),
  usd: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width={20}>
      <g id="_12" data-name="12">
        <path
          fill="red"
          d="M625.57,849.63H398.42a30.69,30.69,0,0,1-21.68-9l-67-67a30.66,30.66,0,1,1,43.37-43.36l58,58H612.87l49.05-49.05v-166l-313.79-101a30.65,30.65,0,0,1-21.27-29.18V299.63a30.64,30.64,0,0,1,5.15-17l67-100.51a30.66,30.66,0,0,1,25.51-13.65h201a30.66,30.66,0,0,1,21.68,9l67,67a30.66,30.66,0,1,1-43.36,43.37l-58-58H441l-52.76,79.13V420.74L702,521.74a30.65,30.65,0,0,1,21.27,29.18V752a30.63,30.63,0,0,1-9,21.68l-67,67A30.63,30.63,0,0,1,625.57,849.63Z"
        />
        <path
          fill="red"
          d="M525.05,957.45a30.66,30.66,0,0,1-30.66-30.66V97.22a30.66,30.66,0,0,1,61.32,0V926.78A30.66,30.66,0,0,1,525.05,957.45Z"
        />
      </g>
    </svg>
  ),
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
                <img src={getCryptoIcon(values.symbol.toUpperCase(), 'dark')} width={18} />
              </a>
              <span className="selectable">{format(price, preferred)}</span>
              {!isSats && icons[preferred]}
            </div>

            <div className="crypto--values">
              <span className="crypto--rank">
                <i className="ion-ios-star" />
                {values.market_cap_rank}
              </span>
              <span className="selectable">
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
