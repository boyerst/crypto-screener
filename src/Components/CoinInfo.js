import { useState } from "react";


const CoinInfo = () => {

  const [historicalData, setHistoricalData] = useState()
  // Default set to 1 day
  const [days, setDays] = useState(1)


  return (
    <div>
      CoinInfo
    </div>
  )    
}

export default CoinInfo