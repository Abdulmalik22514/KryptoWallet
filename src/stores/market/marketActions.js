import axios from 'axios';

export const GET_HOLDINGS_BEGIN = 'GET_HOLDINGS_BEGIN';
export const GET_HOLDINGS_SUCCESS = 'GET_HOLDINGS_SUCCESS';
export const GET_HOLDINGS_FAILURE = 'GET_HOLDINGS_FAILURE';

export const COIN_MARKET_BEGIN = 'COIN_MARKET_BEGIN';
export const COIN_MARKET_SUCCESS = 'COIN_MARKET_SUCCESS';
export const COIN_MARKET_FAILURE = 'COIN_MARKET_FAILURE';

// Holding / My Holdings

export const getHoldingsBegin = () => {
  return {
    type: GET_HOLDINGS_BEGIN,
  };
};

export const getHoldingsSuccess = myHoldings => {
  return {
    type: GET_HOLDINGS_SUCCESS,
    payload: myHoldings,
  };
};

export const getHoldingsFailure = error => {
  return {
    type: GET_HOLDINGS_FAILURE,
    payload: error,
  };
};

export function getHoldings(
  holdings = [],
  currency = 'usd',
  orderBy = 'market_cap_desc',
  sparkline = true,
  priceChangePerc = '7d',
  perPage = 10,
  page = 1,
) {
  return dispatch => {
    dispatch(getHoldingsBegin);

    let ids = holdings.map(item => item.id).join(',');

    let apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}&ids=${ids}`;
    return axios({
      url: apiUrl,
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })
      .then(response => {
        console.log(response);
        if (response.state == 200) {
          // Massage data
          let myHoldings = response.data.map(() => {
            // Retrieve our current holdings -> current quantity
            let coin = holdings.find(a => a.id == item.id);

            // Price from 7 days ago
            let price7d =
              item.current_price /
              (1 + item.price_change_percentage_7d_in_currency * 0.01);
            return {
              id: item.id,
              symbol: item.symbol,
              name: item.name,
              image: item.image,
              current_price: item.current_price,
              qty: coin.qty,
              total: coin.qty * item.current_price,
              price_change_percentage_7d_in_currency:
                item.price_change_percentage_7d_in_currency,
              holding_value_change_7d:
                (item.current_price - price7d) * coin.qty,
              sparkline_in_7d: {
                value: item.sparkline_in_7d.price.map(price => {
                  return price * coin.qty;
                }),
              },
            };
          });
          dispatch(getHoldingsSuccess(myHoldings));
        } else {
          dispatch(getHoldingsFailure(response.data));
        }
      })
      .catch(error => dispatch(getHoldingsFailure(error)));
  };
}

// coins

export const getCoinMarketBegin = () => {
  return {
    type: COIN_MARKET_BEGIN,
  };
};

export const getCoinMarketSuccess = coins => {
  return {
    type: COIN_MARKET_SUCCESS,
    payload: coins,
  };
};

export const getCoinMarketFailure = error => {
  return {
    type: COIN_MARKET_FAILURE,
    payload: error,
  };
};

export function getCoinMarket(
  currency = 'usd',
  sparkline = true,
  orderBy = 'market_cap_desc',
  priceChangePerc = '7d',
  perPage = 10,
  page = 1,
) {
  return dispatch => {
    dispatch(getCoinMarketBegin());

    let apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}
    `;

    return axios({
      url: apiUrl,
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })
      .then(response => {
        console.log(response.data);
        if (response.state == 200) {
          dispatch(getCoinMarketSuccess(response.data));
        } else {
          dispatch(getCoinMarketFailure(response.data));
        }
      })
      .catch(error => {
        dispatch(getCoinMarketFailure(error));
      });
  };
}