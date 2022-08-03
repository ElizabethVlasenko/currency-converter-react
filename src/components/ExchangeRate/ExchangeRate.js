import React, { useContext, useEffect } from "react";
import { CurrencyConverterContext } from "../../context/CurrencyConverter/CurrencyConverterContext";
import "./ExchangeRate.scss";

export default function ExchangeRate() {
  const CurrencyConverter = useContext(CurrencyConverterContext);

  const toThreeDecimalPlaces = (data) => {
    return parseFloat(data, 10).toFixed(3);
  };

  return (
    <div className="exchangeRate_container">
      <ul className="exchangeRate_list">
        <li className="exchangeRate_item">
          USD to UAH{" "}
          {CurrencyConverter.isLoading ? (
            <div class="exchangeRate_loader"></div>
          ) : (
            toThreeDecimalPlaces(CurrencyConverter.USDtoUAH)
          )}
        </li>
        <li className="exchangeRate_item">
          UAH to USD{" "}
          {CurrencyConverter.isLoading ? (
            <div class="exchangeRate_loader"></div>
          ) : (
            toThreeDecimalPlaces(CurrencyConverter.UAHtoUSD)
          )}
        </li>
        <li className="exchangeRate_item">
          EUR to UAH{" "}
          {CurrencyConverter.isLoading ? (
            <div class="exchangeRate_loader"></div>
          ) : (
            toThreeDecimalPlaces(CurrencyConverter.EURtoUAH)
          )}
        </li>
        <li className="exchangeRate_item">
          UAH to EUR{" "}
          {CurrencyConverter.isLoading ? (
            <div class="exchangeRate_loader"></div>
          ) : (
            toThreeDecimalPlaces(CurrencyConverter.UAHtoEUR)
          )}
        </li>
      </ul>
    </div>
  );
}
