import React, { useContext, useEffect } from "react";
import { CurrencyConverterContext } from "../../context/CurrencyConverter/CurrencyConverterContext";
import "./ExchangeRate.scss";

export default function ExchangeRate() {
  const CurrencyConverter = useContext(CurrencyConverterContext);
  useEffect(() => {
    CurrencyConverter.getCurrencyExchangeRate();
  }, []);
  return (
    <div>
      USD to UAH `${CurrencyConverter.USDtoUAH}` UAH to USD `$
      {CurrencyConverter.UAHtoUSD}` EUR to UAH `${CurrencyConverter.EURtoUAH}`
      UAH to EUR `${CurrencyConverter.UAHtoEUR}`
    </div>
  );
}
