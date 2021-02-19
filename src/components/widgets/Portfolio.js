import React, { Component } from 'react'
import { Sparklines, SparklinesLine } from 'react-sparklines'
import getAssetImage from 'cryptoicons-cdn'
import orderBy from 'lodash/orderBy'

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
    const { folio, folioCurrency, privacy, sort = null, sortOrder = 'desc' } = config

    const data = folio
      .map(coin => {
        const hasData = !!values[coin.name]
        const balance = coin.balance || 0

        const { price, pricedBalance, change } = values[coin.name]
          ? {
              change: values[coin.name].prices[folioCurrency].price_change_percentage_24h,
              price: values[coin.name].prices[folioCurrency].current_price,
              pricedBalance: balance * values[coin.name].prices[folioCurrency].current_price,
            }
          : {}

        return {
          ...values[coin.name],
          key: coin.name,
          balance,
          hasData,
          change,
          price,
          pricedBalance,
        }
      })
      .filter(d => d.hasData)

    const out = sort ? orderBy(data, sort, sortOrder) : data

    const balance = data.reduce(
      (acc, coin) => acc + coin.prices[folioCurrency].current_price * (coin.balance || 0),
      0,
    )

    const nextCurrency = folioCurrency === 'usd' ? 'btc' : folioCurrency === 'btc' ? 'eth' : 'usd'

    const toggleCurrency = () => onSave({ ...config, folioCurrency: nextCurrency })
    const togglePrivacy = () => onSave({ ...config, privacy: !privacy })
    const changeSort = newSort =>
      onSave({
        ...config,
        sort: newSort,
        sortOrder: newSort === sort && sortOrder === 'desc' ? 'asc' : 'desc',
      })

    return (
      <div className="w-portfolio">
        {!!balance && (
          <div className="balance" onClick={toggleCurrency}>
            <div>{privacy ? '-' : abbrNumber(Math.floor(balance * 100) / 100)}</div>
            {icons[folioCurrency](20)}
          </div>
        )}

        {!!balance && (
          <div onClick={togglePrivacy} className="privacy-toggle">
            {privacy ? <i className="ion-eye" /> : <i className="ion-eye-disabled" />}
          </div>
        )}

        {out.map((coin, i) => {
          const { change, price } = coin
          const color = change < 0 ? '#DC1A1A' : 'green'
          const isSats = folioCurrency === 'btc' && price < 0.0001

          const libImage = getAssetImage(coin.symbol.toUpperCase(), 'dark')
          const image = libImage.includes('UNKNOWN') ? coin.image : libImage

          return (
            <div className="holding" key={coin.id}>
              <div className="imgContainer" onClick={() => changeSort('market_cap_rank')}>
                <a
                  href={`https://www.coingecko.com/en/coins/${coin.id}`}
                  onClick={e => e.stopPropagation()}
                  target="_blank"
                >
                  <img src={image} width={25} />
                </a>

                <span className="rank">
                  <span>{coin.market_cap_rank}</span>
                </span>
              </div>

              <div className="content">
                <div className="fdc" onClick={() => changeSort('change')}>
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
                  <div className="fdc" onClick={() => changeSort('pricedBalance')}>
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
                  <div onClick={() => this.removeCoin(coin.key)}>x</div>
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
