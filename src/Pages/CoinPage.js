import { 
  makeStyles,
  Typography 
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { SingleCoin } from "../config/api";
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import ReactHtmlParser from 'react-html-parser';
import CoinInfo from "../components/CoinInfo";
import { numberWithCommas } from "../CoinsTable";



const useStyles = makeStyles((theme) => ({
  container: {
    // Flex will align the two components (sidebar and chart) side by side (horizontally)
    display: "flex",
    // theme is passed into makeStyles
    // .breakpoints.down("size") is how we make the page responsive
      // .down("md") = If the viewport is less than the defined medium size, then change the styles to: ...
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  sidebar: {
    width: "30%",
    // If viewport is less than md size, make sidebar 100% of the viewport
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid grey",
  },
  heading: {
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Montserrat",
  },
  description: {
    width: "100%",
    fontFamily: "Montserrat",
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: "justify",
  },
}))



const CoinPage = () => {

  // How does useParams() work?
    // 1. In CoinsTable, there is a clickable link in each coins' TableRow that has a URL of /coins/${row.id}
          // We get this id from the CoinList API
    // 2. Clicking on said link brings us to each coins specific CoinPage
          // When we nav there, our url will read /coins/:id where :id is the name of the coin as specified by the data returned from the CoinList API
    // 3. We use the useParams() hook to access the dynamic portion of the url that is :id or the coin name and also declare it here in the CoinPage
    // 4. Now that we have defined it, we can use that :id to pass to the SingleCoin API here in the CoinPage 
          // This API returns all of the specific data pertaining to that :id or coin name


  // We destructure the :id param we get from the url
      // ❓Is this because useParams returns a object key-value pair and we only need the value ❓
  const { id } = useParams()
  // If we rendered { id } below it would print 'bitcoin' on the 'bitcoin' CoinPage

  // Next we create a 'coin' state to store what we receive from our API
  const [coin, setCoin] = useState()

  const { currency, symbol } = CryptoState() 

  // Fetch coin data from SingleCoin API and set it to coin state using setCoin updating function
  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id))
    setCoin(data)
  }

  console.log(coin)

  // We call fetchCoin / SingleCoin API using useEffect
  useEffect(() => {
    fetchCoin()    
  }, [])


  const classes = useStyles();



  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img 
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" className={classes.heading}>
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" className={classes.description}>
          {/* The API returns a description in many languages, thus we specify en for english
              We also use the split() method and pass the 'end of/beginning of sentence' pattern to divide the full description into an array of sentences
              We then select the first sentance of the array and only display this sentence
           */}
           {/* Some of the descriptions have HTML embedded within them, thus they are rendered as such
              We wrap the description in ReactHtmlParser to covert the html tags into react components
           */}
          {ReactHtmlParser(coin?.description.en.split(". ")[0])}.
        </Typography>
        <div className={classes.marketData}>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Rank: 
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" style={{ fontFamily: "Monserrat" }}>
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </span>
          
        </div>

      </div>
      {/* chart */}
      <CoinInfo coin={coin}/>
    </div>
  )

}



export default CoinPage