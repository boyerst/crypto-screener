import { useState } from "react";
import { CryptoState } from "../CryptoContext";


const CoinInfo = () => {

  const [historicalData, setHistoricalData] = useState()
  // Default set to 1 day
  const [days, setDays] = useState(1)

  const { currency, symbol } = CryptoState()


  return (
    <div>
      CoinInfo
    </div>
  )    
}

export default CoinInfo