import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { connect } from "react-redux";

class CurrencyWidget extends React.Component {
  renderPercentChange(percentChange) {
    return percentChange > 0 ?
    (<span className='change-24h up'>
      <FontAwesomeIcon icon={faChevronUp} />&nbsp; {Math.abs(percentChange)}%
    </span>)
    :
    (<span className='change-24h down'>
      <FontAwesomeIcon icon={faChevronDown} />&nbsp; {Math.abs(percentChange)}%
    </span>)
  }

  render() {
    const cryptoCurrency = this.props.cryptoCurrency;
    const images = require.context('../../assets/currencyIcons', true);

    return (
      <div className='currency'>
        <div className='row'>
          {cryptoCurrency && cryptoCurrency.map(coin => {
            let icon = images(`./${coin.name}.svg`);

            return (
              <div className='col-md-3' key={coin.name}>
                <div className='detail'>
                  <div className='name'>
                    <img src={icon} alt={coin.name} />
                    {coin.name}
                  </div>
                  <span>${coin.price}</span>
                </div>
                <div className='percent-change'>
                  {this.renderPercentChange(coin.percent_change_24h)}
                  <span className={coin.percent_change_7d > 0 ? 'up' : 'down'}>
                    {Math.abs(coin.percent_change_7d)}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
  )}
}
const mapStateToProps = state => {
  return {
    cryptoCurrency: state.data.crypto_currency,
  }
}
export default connect(mapStateToProps, null)(CurrencyWidget)