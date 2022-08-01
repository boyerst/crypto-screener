import { useState, useEffect } from "react";
import { CryptoState } from "../CryptoContext";
import { createTheme, ThemeProvider, makeStyles, CircularProgress  } from "@material-ui/core";
import axios from "axios";
import { HistoricalChart } from "../config/api";
import { chartDays } from "../config/data";
import SelectButton from "./SelectButton";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


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
              <Line 
                data={{
                  // Map() data for datetime for label
                  // We map() through the array of arrays - each containing a date at the [0] index and a price at the [1] index
                  labels: historicData.map((coin) => {
                    // We pass in the date from our data (which sits in the 0 index of each date/price array) to convert it into a human readable date
                    // We need both Date and Time because time will be displayed for prices on lower timeframes and only date will be displayed on higher timeframes
                    let date = new Date(coin[0])      
                    let time =
                      // If hours are greater than 12...
                      date.getHours() > 12
                        // Display as PM in 12 hour format
                        ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                        // Else display as AM in 12 hour format
                        : `${date.getHours()}:${date.getMinutes()} AM`;
                    // If 'days' (timeframe) is set to 1 (ie daily) then return the time : else return the date for display on higher timeframes
                    return days === 1 ? time : date.toLocaleDateString();
                  }),
                  // Map() data for price for Line chart ❓ and price for Y axis labels ❓
                  datasets: [
                    {
                      data: historicData.map((coin) => coin[1]),
                      label: `Price ( Past ${days} Days ) in ${currency}`,
                      borderColor: "#EEBC1D",
                    },
                  ],
                }}
                options={{
                  elements: {
                    point: {
                      radius: 1,
                    },
                  },
                }}
              />
              <div
                style={{
                  display: "flex",
                  marginTop: 20,
                  justifyContent: "space-around",
                  width: "100%"
                }}
              >
                {chartDays.map((day) => (
                  <SelectButton
                    key={day.value}
                    // Set day state with with the day.value of the button that user clicks in
                    onClick={() => setDays(day.value)}
                    // Button is 'selected' when day.value is equal to day state
                    selected={day.value === days}
                  >
                    {day.label}
                  </SelectButton>    
                ))}
              </div>
            </>
          )}
      </div>
    </ThemeProvider>
  )    
}

export default CoinInfo