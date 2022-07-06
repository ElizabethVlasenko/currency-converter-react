import CurrencyConversion from "./components/CurrencyConversion/CurrencyConversion";
import Navigation from "./components/Navigation/Navigation";
import { CurrencyConverterState } from "./context/CurrencyConverter/CurrencyConverterState";

function App() {
  return (
    <CurrencyConverterState>
      <div className="App">
        <Navigation />
        <CurrencyConversion></CurrencyConversion>
      </div>
    </CurrencyConverterState>
  );
}

export default App;
