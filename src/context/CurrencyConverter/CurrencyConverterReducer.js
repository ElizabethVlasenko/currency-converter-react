import {
  GET_EUR_EXCHANGE_RATE,
  GET_USD_EXCHANGE_RATE,
  SET_LOADING,
  SET_USD_VALUE,
  SET_USD_UAH_VALUE,
  SET_EUR_VALUE,
  SET_EUR_UAH_VALUE,
} from "../types";

const handlers = {
  [GET_USD_EXCHANGE_RATE]: (state, { payload }) => ({
    ...state,
    USDtoUAH: payload.USD_UAH,
    UAHtoUSD: payload.UAH_USD,
    loading: false,
    USD_UAH: payload.USD_UAH,
  }),
  [GET_EUR_EXCHANGE_RATE]: (state, { payload }) => ({
    ...state,
    EURtoUAH: payload.EUR_UAH,
    UAHtoEUR: payload.UAH_EUR,
    loading: false,
    EUR_UAH: payload.EUR_UAH,
  }),
  [SET_USD_VALUE]: (state, { payload }) => ({
    ...state,
    USD: payload,
    USD_UAH: payload * state.USDtoUAH,
  }),
  [SET_USD_UAH_VALUE]: (state, { payload }) => ({
    ...state,
    USD_UAH: payload,
    USD: payload * state.UAHtoUSD,
  }),
  [SET_EUR_VALUE]: (state, { payload }) => ({
    ...state,
    EUR: payload,
    EUR_UAH: payload * state.EURtoUAH,
  }),
  [SET_EUR_UAH_VALUE]: (state, { payload }) => ({
    ...state,
    EUR_UAH: payload,
    EUR: payload * state.UAHtoEUR,
  }),
  [SET_LOADING]: (state) => ({ ...state, loading: true }),
  DEFAULT: (state) => state,
};

export const CurrencyConverterReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
