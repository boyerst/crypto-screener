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
    const { data } = await axios.get(CoinList(currency))
  }

  return (
    <div>
      CoinsTable
    </div>
  )

}



export default CoinsTable