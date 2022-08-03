import CurrencyConversion from "./components/CurrencyConversion/CurrencyConversion";
import Footer from "./components/Footer/Footer";
import Navigation from "./components/Navigation/Navigation";
import { CurrencyConverterState } from "./context/CurrencyConverter/CurrencyConverterState";
import "./App.css";
function App() {
  return (
    <CurrencyConverterState>
      <div className="App">
        <Navigation />
        <CurrencyConversion></CurrencyConversion>
        <Footer />
      </div>
    </CurrencyConverterState>
  );
}

export default App;
