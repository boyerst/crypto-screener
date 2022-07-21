import { makeStyles } from "@material-ui/core";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../CryptoContext";
import AliceCarousel from "react-alice-carousel";



const useStyles = makeStyles((theme) => ({
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
}));


const Carousel = () => {


  // Initial state is an empty array
  const [trending, setTrending] = useState([])
  const { currency } = CryptoState()

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
    return (

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