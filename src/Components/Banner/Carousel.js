import { makeStyles } from "@material-ui/core";
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

  const classes = useStyles()

  const { currency, setCurrency } = CryptoState()

  const fetchTrendingCoins = async () => {
    // Pass in the API endpoint
      // Pass in our currency var into the function
    const { data } = await axios.get(TrendingCoins(currency))
  }

  return (
    <div className={classes.carousel}>
      Carousel
    </div>
  )

}



export default Carousel