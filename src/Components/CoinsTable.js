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
  TableCell 
} from "@material-ui/core";
import { useState, useEffect } from 'react';
import axios from "axios";
import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";


const CoinsTable = () => {

  // Initial state is an empty array
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("") 


  const { currency } = CryptoState()


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

  console.log(coins)

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


  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        // Filter and include the following in the search results...
          // If the name of the coin (in lowercase) matches the users' search results
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
                  <TableRow>
                    {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                      <TableCell
                        style={{
                          color: "black",
                          fontWeight: "700",
                          fontFamily: "Montserrat",
                        }}
                        key={head}
                        // When the map key is a "Coin" render "", else render the key to the right ❓
                        align={head === "Coin" ? "" : "right"}
                      >
                        {head}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
              </Table>
            )}
        </TableContainer>



      </Container>
    </ThemeProvider>
  )

}



export default CoinsTable