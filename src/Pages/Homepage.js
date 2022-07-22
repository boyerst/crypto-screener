import React from 'react';
import "../App.css";
import Banner from "../components/Banner/Banner.js"
import CoinsTable from "../components/CoinsTable.js"



const Homepage = () => {

  return (
    <div>
      <Banner />
      <CoinsTable />
    </div>
  )

}



export default Homepage