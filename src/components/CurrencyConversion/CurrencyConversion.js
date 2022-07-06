import React, { useContext, useEffect } from "react";
import { CurrencyConverterContext } from "../../context/CurrencyConverter/CurrencyConverterContext";
import "./CurrencyConversion.scss";

export default function CurrencyConversion() {
  const CurrencyConverter = useContext(CurrencyConverterContext);

  return (
    <div className="currencyConversion_container">
      <h3 className="currencyConversion_header">Currency Conversion</h3>
      <div className="currencyConversion_section">
        <div className="currencyConversion_USD">
          <h5 className="currencyConversion_title">USD UAH Converter</h5>
          <label className="currencyConversion_label" htmlFor={"USD"}>
            {" "}
            USD{" "}
          </label>
          <input
            className="currencyConversion_input"
            id={"USD"}
            type={"number"}
            value={CurrencyConverter.USD}
            onChange={CurrencyConverter.setUSD}
          ></input>
          <label className="currencyConversion_label" htmlFor={"USD_UAH"}>
            {" "}
            UAH{" "}
          </label>
          <input
            className="currencyConversion_input"
            id={"USD_UAH"}
            type={"number"}
            value={CurrencyConverter.USD_UAH}
            onChange={CurrencyConverter.setUSD_UAH}
          ></input>{" "}
        </div>
        <div className="currencyConversion_EUR">
          <h5 className="currencyConversion_title">EUR UAH Converter</h5>
          <label className="currencyConversion_label" htmlFor={"EUR"}>
            {" "}
            EUR{" "}
          </label>
          <input
            className="currencyConversion_input"
            id={"EUR"}
            type={"number"}
            value={CurrencyConverter.EUR}
            onChange={CurrencyConverter.setEUR}
          ></input>
          <label className="currencyConversion_label" htmlFor={"EUR_UAH"}>
            {" "}
            UAH{" "}
          </label>
          <input
            className="currencyConversion_input"
            id={"EUR_UAH"}
            type={"number"}
            value={CurrencyConverter.EUR_UAH}
            onChange={CurrencyConverter.setEUR_UAH}
          ></input>
        </div>
      </div>
    </div>
  );
}
