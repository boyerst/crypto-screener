import { makeStyles } from "@material-ui/core";
import { useState } from 'react';
import axios from "axios";
import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";


const CoinsTable = () => {

  // Initial state is an empty array
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(false)

  const { currency } = CryptoState()


  const fetchCoins = async () => {
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
  }

  return (
    <div>
      CoinsTable
    </div>
  )

}



export default CoinsTable