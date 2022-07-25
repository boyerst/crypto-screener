import { 
  makeStyles, 
  createTheme, 
  ThemeProvider, 
  Container, 
  Typography, 
  TextField, 
  TableContainer,
  LinearProgress,
  Table, 
  TableHead,
  TableRow, 
  TableCell,
  TableBody 
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination"
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";




const useStyles = makeStyles(() => ({
  row: {
    // Background color is same as app
    backgroundColor: "#16171a",
    // Cursor is hand with pointer finger
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#131111",
    },
    fontFamily: "Montserrat",
  }
}));

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinsTable = () => {

  // Initial state is an empty array
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(false)
  // Initial is blank
  const [search, setSearch] = useState("") 
  const [page, setPage] = useState(1) 
  // We need to define the history prop to use for react-router
  const history = useHistory()


  const { currency, symbol } = CryptoState()


  const fetchCoins = async () => {
    setLoading(true)
    // Object Destructuring...
    // We receive an object from CoinGecko API call called 'data' f - wrapping it in braces destructures the data
      // If we just declared the data without braces then we would have to refer to said data as 'data.data'

      // const data = {myObject}
        // const prop = data.myObject.prop
      // const data = {data}
        // const prop = data.data.prop
          // Accessing props requires drilling using chaining (dot notation): data.data.prop
      // const { data } = {myObject}
        // const prop = data.prop
      // const { data } = { data }
          // Accessing props only requires chaining data directly to prop: data.prop
    const { data } = await axios.get(CoinList(currency))
    setCoins(data)
    setLoading(false)
  }

  console.log("Coins from fetchCoins: ", coins)

  // We call fetchTrending when our component is rendered the first time
  useEffect(() => {
    fetchCoins()
    // Add currency as dependency so API call is re-fetched when user selects different currency
  }, [currency])


  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });


  const classes = useStyles();



  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        // Filter and include the following in the search results...
          // If the name of the coin (in lowercase) matches the users' search results         OR
          // If the symbol of the coins (in lowercase) matches the users' search results
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };


  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center"}}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat" }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField 
          label="Search for coins..." 
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
        />

        <TableContainer>
          {
            loading ? (
              <LinearProgress style={{ backgroundColor: "gold" }}/>
            ) : (
              <Table>
                <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                {/* We create an array for the TableHead column titles and simply map through it using 'head' as the 'currentValue' argument*/}
                  <TableRow>
                    {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                      <TableCell
                        style={{
                          color: "black",
                          fontWeight: "700",
                          fontFamily: "Montserrat",
                        }}
                        key={head}
                        // When the value is "Coin" render "", else align the value to the right side of the cell
                          // "" = default which is left-align ❓❓❓
                        align={head === "Coin" ? "" : "right"}
                      >
                        {head}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
              {/* handleSearch() will return the array of objects of all the coins, unless filtered by the user */}
                  {handleSearch()
                    .slice((page - 1) * 10, (page - 1) * 10 + 10)
                    .map((row) => {
                      const profit = row.price_change_percentage_24h > 0;
                      return (
                        <TableRow
                          // Clicking on the coin takes the user to the coin's page
                          onClick={() => history.push(`/coins/${row.id}`)}
                          className={classes.row}
                          // This key is for the map() - we map by each coins' name
                          key={row.name}
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            style={{
                              display: "flex",
                              gap: 15
                            }}
                          >
                            <img 
                              // We use Optional Chaining so that JS will return undefined instead of an exception if the coin does not have a image
                              src={row?.image}
                              alt={row.name}
                              height="50"
                              style={{ marginBottom: 10 }}
                            />
                            <div
                              style={{ display: "flex", flexDirection: "column"}}
                            >
                              <span
                                style={{
                                  textTransform: "uppercase",
                                  fontSize: 22
                                }}
                              >
                                {row.symbol}
                              </span>
                              <span
                                style={{
                                  color: "darkgrey"
                                }}
                              >
                                {row.name}
                              </span>
                              
                            </div>
                          </TableCell>
                          <TableCell align="right">
                            {symbol}{" "}
                            {numberWithCommas(row.current_price.toFixed(2))}                          
                          </TableCell>
                          <TableCell
                            align="right"
                            style={{
                              color: profit > 0 ? "rgb(14, 203, 129)"  : "red",
                              fontWeight: 500
                            }}
                          >
                            {profit && "+"}
                            {row.price_change_percentage_24h.toFixed(2)}%
                          </TableCell>
                          <TableCell align="right">
                            {symbol}{" "}
                            {numberWithCommas(
                              row.market_cap.toString()
                            )}
                          </TableCell>
                        </TableRow>
                      )   
                  })}
                </TableBody>
              </Table>
            )}
        </TableContainer>
        <Pagination 
          // count = how many pages will be required
            // We reference this number from handleSearch()
              // We divide the total number by 10 as we want 10 items/page
              // We call toFixed because we do not want decimals
          // We use Optional Chaining operator in case the return from handleSearch() is empty
          count={(handleSearch()?.length/10).toFixed(0)}
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        />


      </Container>
    </ThemeProvider>
  )

}



export default CoinsTable