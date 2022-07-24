// For CoinsTable
export const CoinList = (currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;
// RETURNS
  //  {
  //   "id": "bitcoin",
  //   "symbol": "btc",
  //   "name": "Bitcoin",
  //   "image": "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
  //   "current_price": 22562,
  //   "market_cap": 431167238704,
  //   "market_cap_rank": 1,
  //   "fully_diluted_valuation": 474021167496,
  //   "total_volume": 42961595701,
  //   "high_24h": 22976,
  //   "low_24h": 22048,
  //   "price_change_24h": -226.1253314407004,
  //   "price_change_percentage_24h": -0.99228,
  //   "market_cap_change_24h": -3905468048.621765,
  //   "market_cap_change_percentage_24h": -0.89766,
  //   "circulating_supply": 19101493,
  //   "total_supply": 21000000,
  //   "max_supply": 21000000,
  //   "ath": 69045,
  //   "ath_change_percentage": -67.31654,
  //   "ath_date": "2021-11-10T14:24:11.849Z",
  //   "atl": 67.81,
  //   "atl_change_percentage": 33179.09658,
  //   "atl_date": "2013-07-06T00:00:00.000Z",
  //   "roi": null,
  //   "last_updated": "2022-07-24T01:14:52.102Z"
  // },



export const SingleCoin = (id) =>
  `https://api.coingecko.com/api/v3/coins/${id}`;

export const HistoricalChart = (id, days = 365, currency) =>
  `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

// For Carousel
export const TrendingCoins = (currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;
// RETURNS
  // 0:
    // ath: 5128383
    // ath_change_percentage: -64.24126
    // ath_date: "2021-11-10T14:24:11.849Z"
    // atl: 3993.42
    // atl_change_percentage: 45821.66797
    // atl_date: "2013-07-05T00:00:00.000Z"
    // circulating_supply: 19099493
    // current_price: 1833611
    // fully_diluted_valuation: 38512728391928
    // high_24h: 1913552
    // id: "bitcoin"
    // image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579"
    // last_updated: "2022-07-21T18:22:36.902Z"
    // low_24h: 1794874
    // market_cap: 35027313634882
    // market_cap_change_24h: -1106556626735.25
    // market_cap_change_percentage_24h: -3.06238
    // market_cap_rank: 1
    // max_supply: 21000000
    // name: "Bitcoin"
    // price_change_24h: -76064.74303836632
    // price_change_percentage_24h: -3.98312
    // price_change_percentage_24h_in_currency: -3.9831228034170176
    // roi: null
    // symbol: "btc"
    // total_supply: 21000000
    // total_volume: 4580487528732