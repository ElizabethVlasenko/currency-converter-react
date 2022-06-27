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
    USDtoUAH: 0,
    UAHtoUSD: 0,
    USD: 1,
    USD_UAH: 1,
    EURtoUAH: 0,
    UAHtoEUR: 0,
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
    dispatch({
      type: GET_USD_EXCHANGE_RATE,
      payload: { ...response.data },
    });
  };
  const getEURExchangeRate = async () => {
    const response = await axios.get(
      "https://cors-anywhere.herokuapp.com/https://free.currconv.com/api/v7/convert?q=EUR_UAH,UAH_EUR&compact=ultra&apiKey=" +
        API_KEY
    );
    dispatch({
      type: GET_EUR_EXCHANGE_RATE,
      payload: { ...response.data },
    });
  };
  const setLoading = () => {
    dispatch({
      type: SET_LOADING,
    });
  };

  const getCurrencyExchangeRate = async () => {
    setLoading();
    getEURExchangeRate();
    getUSDExchangeRate();
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
      }}
    >
      {children}
    </CurrencyConverterContext.Provider>
  );
};
