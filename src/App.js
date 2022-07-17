import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Homepage from "./Pages/Homepage";
import CoinPage from "./Pages/CoinPage";


function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Route path='/' component={Homepage} />
        <Route path='/coins/:id' component={CoinPage} />
      </div>
    </BrowserRouter>
  );
}



export default App;





