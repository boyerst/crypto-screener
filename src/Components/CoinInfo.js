import { useState } from "react";
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import { HistoricalChart } from "../config/api";


// Coin is passed from CoinPage where we set 'coin' state with data from the SingleCoin API
const CoinInfo = ( {coin} ) => {

  const [historicData, setHistoricData] = useState()
  // Default set to 1 day
  const [days, setDays] = useState(1)

  const { currency } = CryptoState()

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency))
    setHistoricData(data.prices)
  }

  console.log(historicData)


  return (
    <div>
      CoinInfo
    </div>
  )    
}

export default CoinInfo