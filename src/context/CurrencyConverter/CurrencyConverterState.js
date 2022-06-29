import React, { useReducer } from "react";
import axios from "axios";
import {
  GET_EUR_EXCHANGE_RATE,
  GET_USD_EXCHANGE_RATE,
  SET_LOADING,
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

    localStorage.setItem("USDtoUAH", response.data.USD_UAH);
    localStorage.setItem("UAHtoUSD", response.data.UAH_USD);

    dispatch({
      type: GET_USD_EXCHANGE_RATE,
      payload: { ...response.data },
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

  const getEURExchangeRate = async () => {
    const response = await axios.get(
      "https://cors-anywhere.herokuapp.com/https://free.currconv.com/api/v7/convert?q=EUR_UAH,UAH_EUR&compact=ultra&apiKey=" +
        API_KEY
    );

    localStorage.setItem("EURtoUAH", response.data.EUR_UAH);
    localStorage.setItem("UAHtoEUR", response.data.UAH_EUR);

    dispatch({
      type: GET_EUR_EXCHANGE_RATE,
      payload: { ...response.data },
    });
  };

  const getLocalEURExchangeRate = () => {
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

      // autoRefresh(expiresIn);
      // } else if (isNaN(localStorageExpDate)) {
      //   console.log("localStorageExpDate == null");
      //   setLoading();
      //   getEURExchangeRate();
      //   getUSDExchangeRate();
      //   const expiresIn = 3600000; //1 hour
      //   const expirationDate = new Date(new Date().getTime() + expiresIn);
      //   localStorage.setItem("expirationDate", expirationDate);
      //   // autoRefresh(expiresIn);
    } else {
      setLoading();
      getLocalUSDExchangeRate();
      getLocalEURExchangeRate();
    }
  };

  // const autoRefresh = (time) => {
  //   return setTimeout(() => {
  //     console.log(time);
  //     getCurrencyExchangeRate();
  //     console.log("refreshed!");
  //   }, time * 1000);
  // };

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
      }}
    >
      {children}
    </CurrencyConverterContext.Provider>
  );
};
