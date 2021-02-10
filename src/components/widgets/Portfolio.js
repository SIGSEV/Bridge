import React, { Component } from 'react'
import { Sparklines, SparklinesLine } from 'react-sparklines'
import getAssetImage from 'cryptoicons-cdn'

import BtcIcon from 'assets/btc-symbol.svg'
import EthIcon from 'assets/eth-symbol.svg'
import UsdIcon from 'assets/usd-symbol.svg'

import TextInput from 'components/TextInput'

import abbrNumber from 'fn/abbrNumber'

const icons = {
  btc: width => <BtcIcon width={width} height={20} fill="#bababa" />,
  eth: width => <EthIcon width={width} fill="#bababa" />,
  usd: width => <UsdIcon width={width} fill="#bababa" />,
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

const move = (from, to, ...a) => (a.splice(to, 0, ...a.splice(from, 1)), a)

class Portfolio extends Component {
  addCrypto = e => {
    if (e.which !== 13) {
      return
    }

    const {
      onSave,
      data: { config },
    } = this.props

    const input = this.refs.add.getWrappedInstance()
    const value = input.getText()

    if (!value) {
      return
    }

    onSave({ ...config, folio: config.folio.concat([{ name: value }]) })
    input.reset()
  }

  removeCoin = name => {
    const {
      onSave,
      data: { values, config },
    } = this.props

    const folio = config.folio.filter(c => c.name !== name && values[c.name])

    onSave({ ...config, folio })
  }

  moveCoin = (from, to) => {
    const {
      onSave,
      data: { config },
    } = this.props

    onSave({ ...config, folio: move(from, to, ...config.folio) })
  }

  updateBalance = (key, value) => {
    const {
      onSave,
      data: { config },
    } = this.props

    const balance = isNaN(value) ? 0 : Number(value)

    onSave({
      ...config,
      folio: config.folio.map(coin => ({
        ...coin,
        balance: coin.name === key ? balance : coin.balance,
      })),
    })
  }

  render() {
    const { edit, onSave } = this.props
    const { config, values } = this.props.data
    const { folio, folioCurrency, privacy } = config

    const data = folio
      .map(coin => ({
        ...values[coin.name],
        key: coin.name,
        balance: coin.balance || 0,
        hasData: !!values[coin.name],
      }))
      .filter(d => d.hasData)

    const balance = data.reduce(
      (acc, coin) => acc + coin.prices[folioCurrency].current_price * (coin.balance || 0),
      0,
    )

    const nextCurrency = folioCurrency === 'usd' ? 'btc' : folioCurrency === 'btc' ? 'eth' : 'usd'

    const toggleCurrency = () => onSave({ ...config, folioCurrency: nextCurrency })
    const togglePrivacy = () => onSave({ ...config, privacy: !privacy })

    return (
      <div className="w-portfolio">
        <div className="balance" onClick={toggleCurrency}>
          <div>{privacy ? '-' : abbrNumber(Math.floor(balance * 100) / 100)}</div>
          {icons[folioCurrency](20)}
        </div>

        <div onClick={togglePrivacy} className="privacy-toggle">
          {privacy ? <i className="ion-eye" /> : <i className="ion-eye-disabled" />}
        </div>

        {data.map((coin, i) => {
          const change = coin.prices[folioCurrency].price_change_percentage_24h
          const color = change < 0 ? '#DC1A1A' : 'green'
          const price = coin.prices[folioCurrency].current_price
          const isSats = folioCurrency === 'btc' && price < 0.0001

          const libImage = getAssetImage(coin.symbol.toUpperCase(), 'dark')
          const image = libImage.includes('UNKNOWN') ? coin.image : libImage

          return (
            <div className="holding" key={coin.id}>
              <a href={`https://www.coingecko.com/en/coins/${coin.id}`} target="_blank">
                <img src={image} width={25} />

                <span className="rank">
                  <span>{coin.market_cap_rank}</span>
                </span>
              </a>

              <div className="content">
                <div className="fdc">
                  <div className="fac">
                    <span>{format(price, folioCurrency)}</span>
                    {!isSats && (
                      <span className="fac" style={{ marginBottom: 5 }}>
                        {icons[folioCurrency](15)}
                      </span>
                    )}
                  </div>

                  {change ? (
                    <span style={{ color }}>{change.toFixed(2)}%</span>
                  ) : (
                    <span>{'-'}</span>
                  )}
                </div>

                {edit ? (
                  <TextInput
                    defaultValue={coin.balance}
                    onChange={e => this.updateBalance(coin.key, e.target.value)}
                    placeholder="Balance"
                  />
                ) : (
                  <div className="fdc">
                    <span>
                      {coin.balance && !privacy ? (
                        <span className="fac">
                          {abbrNumber(Math.round(coin.balance * price * 100) / 100)}

                          <span className="fac" style={{ marginBottom: 5 }}>
                            {icons[folioCurrency](15)}
                          </span>
                        </span>
                      ) : (
                        '-'
                      )}
                    </span>
                    <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                      {coin.balance && !privacy ? abbrNumber(coin.balance) : '-'}
                    </span>
                  </div>
                )}

                <Sparklines data={coin.sparkline_in_7d.price}>
                  <SparklinesLine style={{ strokeWidth: 3 }} color={color} />
                </Sparklines>
              </div>

              {edit && (
                <div className="fdc z buttons">
                  {i !== 0 && <div onClick={() => this.moveCoin(i, i - 1)}>↑</div>}
                  <div onClick={() => this.removeCoin(coin.key)}>x</div>
                  {i !== data.length - 1 && <div onClick={() => this.moveCoin(i, i + 1)}>↓</div>}
                </div>
              )}
            </div>
          )
        })}

        {edit && (
          <div className="add-form">
            <TextInput onKeyPress={this.addCrypto} placeholder="Add another coin" ref="add" />
            <i className="ion-plus-circled" />
          </div>
        )}
      </div>
    )
  }
}

export default Portfolio
