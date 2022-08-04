import React, { useContext, useEffect } from "react";
import { CurrencyConverterContext } from "../../context/CurrencyConverter/CurrencyConverterContext";
import "./CurrencyConversion.scss";

export default function CurrencyConversion() {
  const CurrencyConverter = useContext(CurrencyConverterContext);
  const currenciesOptions = Object.keys(CurrencyConverter.allCurrencies).map(
    function (key, index) {
      return (
        <option value={CurrencyConverter.allCurrencies[key].id} key={index}>
          {CurrencyConverter.allCurrencies[key].currencyName}
        </option>
      );
    }
  );

  useEffect(() => {
    CurrencyConverter.getCurrencyExchangeRate();
  }, []);

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
        <div className="currencyConversion_GBP">
          <h5 className="currencyConversion_title">GBP UAH Converter</h5>
          <label className="currencyConversion_label" htmlFor={"GBP"}>
            {" "}
            GBP{" "}
          </label>
          <input
            className="currencyConversion_input"
            id={"GBP"}
            type={"number"}
            value={CurrencyConverter.GBP}
            onChange={CurrencyConverter.setGBP}
          ></input>
          <label className="currencyConversion_label" htmlFor={"GBP_UAH"}>
            {" "}
            UAH{" "}
          </label>
          <input
            className="currencyConversion_input"
            id={"GBP_UAH"}
            type={"number"}
            value={CurrencyConverter.GBP_UAH}
            onChange={CurrencyConverter.setGBP_UAH}
          ></input>{" "}
        </div>
        <div className="currencyConversion_any">
          <h5 className="currencyConversion_title">Any currency Converter</h5>
          <select
            className="currencyConversion_input currencyConversion_select"
            name="firstCurrency"
            id="firstCurrency"
            onChange={CurrencyConverter.getCustomCurrencyExchangeRate}
          >
            {currenciesOptions}
          </select>
          <input
            className="currencyConversion_input"
            id={"fromCurrency"}
            type={"number"}
            value={CurrencyConverter.firstCurrency}
            onChange={CurrencyConverter.setFirstCurrency}
          ></input>

          <br />
          <select
            className="currencyConversion_input currencyConversion_select"
            name="secondCurrency"
            id="secondCurrency"
            onChange={CurrencyConverter.getCustomCurrencyExchangeRate}
          >
            {currenciesOptions}
          </select>
          <input
            className="currencyConversion_input"
            id={"toCurrency"}
            type={"number"}
            value={CurrencyConverter.secondCurrency}
            onChange={CurrencyConverter.setSecondCurrency}
          ></input>
          <br />
          <p className="currencyConversion_info">
            {CurrencyConverter.loading ? (
              <span className="currencyConversion_loader"></span>
            ) : (
              `1 ${CurrencyConverter.firstCurrencyName} equals ${CurrencyConverter.firstToSecond} ${CurrencyConverter.secondCurrencyName}`
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
