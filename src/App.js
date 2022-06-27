import Navigation from "./components/Navigation/Navigation";
import { CurrencyConverterState } from "./context/CurrencyConverter/CurrencyConverterState";

function App() {
  return (
    <CurrencyConverterState>
      <div className="App">
        <Navigation />
      </div>
    </CurrencyConverterState>
  );
}

export default App;
