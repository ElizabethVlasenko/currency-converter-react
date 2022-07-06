import React, { useReducer } from "react";
import axios from "axios";
import {
  GET_EUR_EXCHANGE_RATE,
  GET_USD_EXCHANGE_RATE,
  SET_LOADING,
  SET_USD_VALUE,
  SET_USD_UAH_VALUE,
  SET_EUR_UAH_VALUE,
  SET_EUR_VALUE,
} from "../types";
import { CurrencyConverterReducer } from "./CurrencyConverterReducer";
import { CurrencyConverterContext } from "./CurrencyConverterContext";

const API_KEY = process.env.REACT_APP_API_KEY;

export const CurrencyConverterState = ({ children }) => {
  const initialState = {
    USDtoUAH: null,
    UAHtoUSD: null,
    USD: 1,
    USD_UAH: 1,
    EURtoUAH: null,
    UAHtoEUR: null,
    EUR: 1,
    EUR_UAH: 1,
    loading: false,
  };

  const [state, dispatch] = useReducer(CurrencyConverterReducer, initialState);

  const getUSDExchangeRate = async () => {
    const response = await axios.get(
      "https://cors-anywhere.herokuapp.com/https://free.currconv.com/api/v7/convert?q=USD_UAH,UAH_USD&compact=ultra&apiKey=" +
        API_KEY
    );
    const data = dataToThreeFixed(response.data);
    localStorage.setItem("USDtoUAH", data.USD_UAH);
    localStorage.setItem("UAHtoUSD", data.UAH_USD);

    dispatch({
      type: GET_USD_EXCHANGE_RATE,
      payload: { ...data },
    });
  };

  const getLocalUSDExchangeRate = () => {
    let data = {
      USD_UAH: localStorage.getItem("USDtoUAH"),
      UAH_USD: localStorage.getItem("UAHtoUSD"),
    };
    dispatch({
      type: GET_USD_EXCHANGE_RATE,
      payload: { ...data },
    });
  };

  const dataToThreeFixed = (data) => {
    let result = {};
    for (const [key, value] of Object.entries(data)) {
      result[key] = Number(parseFloat(value, 10).toFixed(3));
    }
    return result;
  };

  const getEURExchangeRate = async () => {
    const response = await axios.get(
      "https://cors-anywhere.herokuapp.com/https://free.currconv.com/api/v7/convert?q=EUR_UAH,UAH_EUR&compact=ultra&apiKey=" +
        API_KEY
    );
    const data = dataToThreeFixed(response.data);

    localStorage.setItem("EURtoUAH", data.EUR_UAH);
    localStorage.setItem("UAHtoEUR", data.UAH_EUR);

    dispatch({
      type: GET_EUR_EXCHANGE_RATE,
      payload: { ...data },
    });
  };

  const getLocalEURExchangeRate = () => {
    setLoading();
    let data = {
      EUR_UAH: localStorage.getItem("EURtoUAH"),
      UAH_EUR: localStorage.getItem("UAHtoEUR"),
    };
    dispatch({
      type: GET_EUR_EXCHANGE_RATE,
      payload: { ...data },
    });
  };

  const setLoading = () => {
    dispatch({
      type: SET_LOADING,
    });
  };

  const getCurrencyExchangeRate = async () => {
    setLoading();
    let localStorageExpDate = Date.parse(
      localStorage.getItem("expirationDate")
    );

    if (isNaN(localStorageExpDate) || localStorageExpDate < new Date()) {
      setLoading();
      getEURExchangeRate();
      getUSDExchangeRate();
      const expiresIn = 3600000;
      const expirationDate = new Date(new Date().getTime() + expiresIn);
      localStorage.setItem("expirationDate", expirationDate);
    } else {
      setLoading();
      getLocalUSDExchangeRate();
      getLocalEURExchangeRate();
    }
  };

  const toCurrencyFormat = (number) => {
    if (number.charAt(0) === "0") {
      number = number.substring(1);
      return number;
    } else if (number <= 0) {
      return 0;
    } else return number;
  };

  const setUSD = (e) => {
    dispatch({
      type: SET_USD_VALUE,
      payload: toCurrencyFormat(e.target.value),
    });
  };

  const setUSD_UAH = (e) => {
    dispatch({
      type: SET_USD_UAH_VALUE,
      payload: toCurrencyFormat(e.target.value),
    });
  };

  const setEUR = (e) => {
    dispatch({
      type: SET_EUR_VALUE,
      payload: toCurrencyFormat(e.target.value),
    });
  };

  const setEUR_UAH = (e) => {
    dispatch({
      type: SET_EUR_UAH_VALUE,
      payload: toCurrencyFormat(e.target.value),
    });
  };

  const {
    USDtoUAH,
    UAHtoUSD,
    USD,
    USD_UAH,
    EURtoUAH,
    UAHtoEUR,
    EUR,
    EUR_UAH,
    loading,
  } = state;

  return (
    <CurrencyConverterContext.Provider
      value={{
        USDtoUAH,
        UAHtoUSD,
        USD,
        USD_UAH,
        EURtoUAH,
        UAHtoEUR,
        EUR,
        EUR_UAH,
        loading,
        getCurrencyExchangeRate,
        setUSD,
        setUSD_UAH,
        setEUR,
        setEUR_UAH,
      }}
    >
      {children}
    </CurrencyConverterContext.Provider>
  );
};
