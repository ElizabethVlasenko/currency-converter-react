import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CurrencyConverterState } from "./context/CurrencyConverter/CurrencyConverterState";
import About from "./components/About/About";
import CurrencyConversion from "./components/CurrencyConversion/CurrencyConversion";
import Navigation from "./components/Navigation/Navigation";
import Footer from "./components/Footer/Footer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/about"
          element={
            <CurrencyConverterState>
              <Navigation />
              <About />
              <Footer />
            </CurrencyConverterState>
          }
        />
        <Route
          path="/currency-converter"
          element={
            <CurrencyConverterState>
              <Navigation />
              <CurrencyConversion></CurrencyConversion>
              <Footer />
            </CurrencyConverterState>
          }
        />
        <Route path="*" redirect="/" />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
