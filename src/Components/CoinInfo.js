import { useState, useEffect } from "react";
import { CryptoState } from "../CryptoContext";
import { createTheme, ThemeProvider, makeStyles  } from "@material-ui/core";
import axios from "axios";
import { HistoricalChart } from "../config/api";


const useStyles = makeStyles({});



// Coin is passed from CoinPage where we set 'coin' state with data from the SingleCoin API
const CoinInfo = ( {coin} ) => {

  const [historicData, setHistoricData] = useState()
  // Default set to 1 day
  const [days, setDays] = useState(1)

  const { currency } = CryptoState()

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency))
    // We only want the prices
    setHistoricData(data.prices)
  }

  useEffect(() => {
    fetchHistoricData()
    // Dependencies: API will be called when currency or days change 
  }, [currency, days])


  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const classes = useStyles();

  console.log(historicData)


  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        
      </div>
    </ThemeProvider>
  )    
}

export default CoinInfo