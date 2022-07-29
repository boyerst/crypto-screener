import { useState, useEffect } from "react";
import { CryptoState } from "../CryptoContext";
import { createTheme, ThemeProvider, makeStyles, CircularProgress  } from "@material-ui/core";
import axios from "axios";
import { HistoricalChart } from "../config/api";



const useStyles = makeStyles((theme) => ({
  container: {
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 40,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
    },
  },
}));





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
        {
          // If there is NO data in historicalData state, show loader
          !historicData ? (
            <CircularProgress 
              style={{ color: "gold" }}
              size={250}
              thickness={1}
            />
          ) : (
            <>

            </>
          )
        }
      </div>
    </ThemeProvider>
  )    
}

export default CoinInfo