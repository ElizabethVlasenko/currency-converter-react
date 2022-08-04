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
  SET_FIRST_CURRENCY,
  SET_FIRST_CURRENCY_NAME,
  SET_SECOND_CURRENCY_NAME,
  SET_SECOND_CURRENCY,
  GET_CUSTOM_EXCHANGE_RATE,
  GET_GBP_EXCHANGE_RATE,
  SET_GBP_VALUE,
  SET_GBP_UAH_VALUE,
} from "../types";
import { CurrencyConverterReducer } from "./CurrencyConverterReducer";
import { CurrencyConverterContext } from "./CurrencyConverterContext";
import data from "./currencies.json";

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
    GBPtoUAH: null,
    UAHtoGBP: null,
    GBP: 1,
    GBP_UAH: 1,
    loading: false,
    allCurrencies: { ...data },
    firstCurrencyName: "ALL",
    secondCurrencyName: "ALL",
    firstCurrency: 1,
    secondCurrency: 1,
    firstToSecond: 1,
    secondToFirst: 1,
  };

  // console.log(initialState);

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

  const getGBPExchangeRate = async () => {
    const response = await axios.get(
      "https://cors-anywhere.herokuapp.com/https://free.currconv.com/api/v7/convert?q=GBP_UAH,UAH_GBP&compact=ultra&apiKey=" +
        API_KEY
    );
    const data = dataToThreeFixed(response.data);

    localStorage.setItem("GBPtoUAH", data.GBP_UAH);
    localStorage.setItem("UAHtoGBP", data.UAH_GBP);

    dispatch({
      type: GET_GBP_EXCHANGE_RATE,
      payload: { ...data },
    });
  };

  const getLocalGBPExchangeRate = () => {
    setLoading();
    let data = {
      GBP_UAH: localStorage.getItem("GBPtoUAH"),
      UAH_GBP: localStorage.getItem("UAHtoGBP"),
    };
    dispatch({
      type: GET_GBP_EXCHANGE_RATE,
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
      getGBPExchangeRate();
      const expiresIn = 3600000;
      const expirationDate = new Date(new Date().getTime() + expiresIn);
      localStorage.setItem("expirationDate", expirationDate);
    } else {
      setLoading();
      getLocalUSDExchangeRate();
      getLocalEURExchangeRate();
      getLocalGBPExchangeRate();
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

  const toFixedFloat = (data) => {
    return parseFloat(data, 10).toFixed(3);
  };

  const setUSD = (e) => {
    let USD = toCurrencyFormat(e.target.value);
    let USD_UAH = toFixedFloat(state.USDtoUAH * USD);
    dispatch({
      type: SET_USD_VALUE,
      payload: { USD, USD_UAH },
    });
  };

  const setUSD_UAH = (e) => {
    let USD_UAH = toCurrencyFormat(e.target.value);
    let USD = toFixedFloat(state.UAHtoUSD * USD_UAH);
    dispatch({
      type: SET_USD_UAH_VALUE,
      payload: { USD, USD_UAH },
    });
  };

  const setEUR = (e) => {
    let EUR = toCurrencyFormat(e.target.value);
    let EUR_UAH = toFixedFloat(state.EURtoUAH * EUR);
    dispatch({
      type: SET_EUR_VALUE,
      payload: { EUR, EUR_UAH },
    });
  };

  const setEUR_UAH = (e) => {
    let EUR_UAH = toCurrencyFormat(e.target.value);
    let EUR = toFixedFloat(state.UAHtoEUR * EUR_UAH);
    dispatch({
      type: SET_EUR_UAH_VALUE,
      payload: { EUR, EUR_UAH },
    });
  };

  const setGBP = (e) => {
    let GBP = toCurrencyFormat(e.target.value);
    let GBP_UAH = toFixedFloat(state.GBPtoUAH * GBP);
    dispatch({
      type: SET_GBP_VALUE,
      payload: { GBP, GBP_UAH },
    });
  };

  const setGBP_UAH = (e) => {
    let GBP_UAH = toCurrencyFormat(e.target.value);
    let GBP = toFixedFloat(state.UAHtoEUR * GBP_UAH);
    dispatch({
      type: SET_GBP_UAH_VALUE,
      payload: { GBP, GBP_UAH },
    });
  };

  const getCustomCurrencyExchangeRate = async (e) => {
    setLoading();
    console.log(state.firstCurrency);
    if (e.target.name === "firstCurrency") {
      setFirstCurrencyName(e.target.value);
      let exchangeRate = await getCustomExchangeRate(
        e.target.value,
        state.secondCurrencyName
      );
      setFirstCurrency(state.firstCurrency, exchangeRate.firstToSecond);
    } else if (e.target.name === "secondCurrency") {
      setSecondCurrencyName(e.target.value);
      let exchangeRate = await getCustomExchangeRate(
        state.firstCurrencyName,
        e.target.value
      );
      setFirstCurrency(state.firstCurrency, exchangeRate.firstToSecond);
    } else {
      console.log("Error. e.target.name = ", e.target.name);
    }
  };

  const getCustomExchangeRate = async (
    firstCurrencyName,
    secondCurrencyName
  ) => {
    console.log(firstCurrencyName, secondCurrencyName);
    const response = await axios.get(
      `https://cors-anywhere.herokuapp.com/https://free.currconv.com/api/v7/convert?q=${firstCurrencyName}_${secondCurrencyName},${secondCurrencyName}_${firstCurrencyName}&compact=ultra&apiKey=${API_KEY}`
    );
    const data = dataToThreeFixed(response.data);
    const firstToSecond = data[firstCurrencyName + "_" + secondCurrencyName];
    const secondToFirst = data[secondCurrencyName + "_" + firstCurrencyName];
    console.log(data);
    dispatch({
      type: GET_CUSTOM_EXCHANGE_RATE,
      payload: { firstToSecond, secondToFirst },
    });
    return { firstToSecond, secondToFirst };
  };

  const setFirstCurrencyName = (firstCurrencyName) => {
    dispatch({
      type: SET_FIRST_CURRENCY_NAME,
      payload: { firstCurrencyName },
    });
  };

  const setSecondCurrencyName = (secondCurrencyName) => {
    dispatch({
      type: SET_SECOND_CURRENCY_NAME,
      payload: { secondCurrencyName },
    });
  };

  const setFirstCurrency = (value, firstToSecond = state.firstToSecond) => {
    console.log(firstToSecond, state.firstToSecond);
    let firstCurrency;
    let secondCurrency;
    if (typeof value === "object" && !Array.isArray(value) && value !== null) {
      firstCurrency = toCurrencyFormat(value.target.value);
    } else {
      firstCurrency = value;
    }
    secondCurrency = toFixedFloat(firstToSecond * firstCurrency);
    console.log(secondCurrency, firstCurrency);
    dispatch({
      type: SET_FIRST_CURRENCY,
      payload: { secondCurrency, firstCurrency },
    });
  };

  const setSecondCurrency = (value) => {
    let firstCurrency;
    let secondCurrency;
    if (typeof value === "object" && !Array.isArray(value) && value !== null) {
      secondCurrency = toCurrencyFormat(value.target.value);
    } else {
      secondCurrency = value;
    }
    firstCurrency = toFixedFloat(state.secondToFirst * secondCurrency);
    dispatch({
      type: SET_SECOND_CURRENCY,
      payload: { secondCurrency, firstCurrency },
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
    GBP,
    GBP_UAH,
    GBPtoUAH,
    UAHtoGBP,
    loading,
    allCurrencies,
    firstCurrency,
    secondCurrency,
    firstCurrencyName,
    secondCurrencyName,
    firstToSecond,
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
        GBP,
        GBP_UAH,
        GBPtoUAH,
        UAHtoGBP,
        loading,
        allCurrencies,
        firstCurrency,
        secondCurrency,
        firstCurrencyName,
        secondCurrencyName,
        firstToSecond,
        getCurrencyExchangeRate,
        getCustomCurrencyExchangeRate,
        setSecondCurrency,
        setFirstCurrency,
        setUSD,
        setUSD_UAH,
        setEUR,
        setEUR_UAH,
        setGBP,
        setGBP_UAH,
      }}
    >
      {children}
    </CurrencyConverterContext.Provider>
  );
};
