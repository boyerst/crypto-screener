import { makeStyles } from "@material-ui/core";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../CryptoContext";
import AliceCarousel from "react-alice-carousel";
import { numberWithCommas } from "../CoinsTable";


const useStyles = makeStyles((theme) => ({
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
  carouselItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white",
  },
}));





const Carousel = () => {


  // Initial state is an empty array
  const [trending, setTrending] = useState([])
  const { currency, symbol } = CryptoState()

  const fetchTrendingCoins = async () => {
    // Pass in the API endpoint
      // Pass in our currency var into the function
    // We create a new state to manage the { data } we get from the API call
    const { data } = await axios.get(TrendingCoins(currency))
    // After fetching the data we set it to our 'trending' state
    setTrending(data)
  }

  console.log(currency, trending)

  // We call fetchTrending when our component is rendered the first time
  useEffect(() => {
    fetchTrendingCoins()
    // Add currency as dependency so API call is re-fetched when user selects different currency
  }, [currency])

  const classes = useStyles()

  // We grab and map through the items from 'trending' from CryptoState
  const items = trending.map((coin) => {

    // Find out if the coin is in profit over past 24h
    let profit = coin?.price_change_percentage_24h >= 0;

    return (
      // We use Link component in order to nav from the Carousel to the coin page
      <Link
        className={classes.carouselItem}
        // Link to the coin's page
        to={`/coins/${coin.id}`}
      >
        <img 
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{marginBottom: 10}} 
        />
        <span>
          {coin?.symbol}
          &nbsp;
          <span  
            style={{
              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
          >
          {/* If there is profit within 24H then add a "+"  /   Then add the % price change 24H */}
          {/* If there is no profit a "-" will automatically be displayed, but if there is profit a "+" won't automatically  be displayed - this is why we have to determine if profit and conditionally render a "+" */}
            {profit && "+"} 
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{fontSize: 22, fontWeight: 500}}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    )
  })


  const responsive = {
    // 0 - 512px: two items will be displayed
    0: {
      items: 2, 
    },
    // 512px+: four items will be displayed
    512: {
      items: 4, 
    }
  };



  return (
    <div className={classes.carousel}>
      <AliceCarousel 
        mouseTracking
        // infinite loop
        infinite
        // Default # = 400, we set to 1 sec
        autoPlayInterval={1000}
        animationDuration={1500}
        // Removed indexed dots
        disableDotsControls
        // Remove nav arrows
        disableButtonsControls
        // Responsive = how many items on screen at a time
        // See object defined above
        responsive={responsive}
        autoplay
        items={items}
      />
    </div>
  )

}




export default Carousel