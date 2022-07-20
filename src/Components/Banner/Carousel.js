import { makeStyles } from "@material-ui/core";
import { useState, useEffect } from 'react';
import axios from "axios";
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../CryptoContext";



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

  // We call fetchTrending when our component is rendered the first time
  useEffect(() => {
    fetchTrendingCoins()
  }, [])

  const classes = useStyles()


  return (
    <div className={classes.carousel}>
      Carousel
    </div>
  )

}




export default Carousel