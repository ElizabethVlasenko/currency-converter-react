import CurrencyConversion from "./components/CurrencyConversion/CurrencyConversion";
import Navigation from "./components/Navigation/Navigation";
import { CurrencyConverterState } from "./context/CurrencyConverter/CurrencyConverterState";
import { StateInspector } from "reinspect";

function App() {
  return (
    <CurrencyConverterState>
      <StateInspector className="App">
        <Navigation />
        <CurrencyConversion></CurrencyConversion>
      </StateInspector>
    </CurrencyConverterState>
  );
}

export default App;
