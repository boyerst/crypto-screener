import React from 'react';
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { SingleCoin } from "../config/api";
import { CryptoState } from "../CryptoContext";
import axios from "axios";



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

  return (
    <div>
      CoinPage
    </div>
  )

}



export default CoinPage