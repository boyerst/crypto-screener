import Tract from 'react';
import { createContext } from 'react';


const Crypto = createContext()


const CryptoContext = ({children}) => {

  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹")

  // This will run everytime the currency changes, hence why we have currency set as a dependency
  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
  // This function is dependent on currency, thus whenever currency changes, the function will run and conditionally apply symbols
  }, [currency]);

  return (

    <Crypto.Provider value={{currency, symbol, setCurrency}}>
      {children}
    </Crypto.Provider>
  )
}


export default CryptoContext

export const CryptoState = () => {
  return useContext(Crypto)
}