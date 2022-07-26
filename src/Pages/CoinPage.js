import React from 'react';
import { useParams } from "react-router-dom";
import { useState } from 'react';



const CoinPage = () => {
  // We take the id from our URL that we click on in the HomePage and use this id to fetch one single coin from the CoinGecko API
    // We do this using useParams() from react-router-dom
  // We destructure the id var we get from the url
  const { id } = useParams()
  // Next we create a 'coin' state to store what we receive from our API
  const [coin, setCoin] = useState()



  return (
    <div>
      CoinPage
    </div>
  )

}



export default CoinPage