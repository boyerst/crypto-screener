import Tract from 'react';
import { createContext, useState, useEffect, useContext } from 'react';

// Define context object
const Crypto = createContext()

// We wrap our entire app with this component (SEE index.js)
const CryptoContext = ({children}) => {

  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹")

  // This will run everytime the currency changes, hence why we have currency set as a dependency
  useEffect(() => {
    if (currency === "BTC") setSymbol("₿");
    else if (currency === "USD") setSymbol("$");
  // This function is dependent on currency, thus whenever currency changes, the function will run and conditionally apply symbols
  }, [currency]);

  return (

    // Translates to ContextObject.Provider or createContext.Provider
    <Crypto.Provider value={{currency, symbol, setCurrency}}>
      {children}
    </Crypto.Provider>
  )
}


export default CryptoContext

// Define and export useContext
  // Pass in the context object...returns the latest context value for that context
export const CryptoState = () => {
  return useContext(Crypto)
}