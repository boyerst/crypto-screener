
const CoinsTable = () => {

  // Initial state is an empty array
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(false)




  const fetchCoinList = async () => {

    const { data } = await axios.get(CoinList(currency))

  }

  return (
    <div>
      CoinsTable
    </div>
  )

}



export default CoinsTable