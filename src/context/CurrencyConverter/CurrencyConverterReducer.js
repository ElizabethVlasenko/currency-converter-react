import {
  GET_EUR_EXCHANGE_RATE,
  GET_USD_EXCHANGE_RATE,
  SET_LOADING,
  SET_USD_VALUE,
  SET_USD_UAH_VALUE,
  SET_EUR_VALUE,
  SET_EUR_UAH_VALUE,
  SET_FIRST_CURRENCY_NAME,
  SET_SECOND_CURRENCY_NAME,
  SET_FIRST_CURRENCY,
  SET_SECOND_CURRENCY,
  GET_CUSTOM_EXCHANGE_RATE,
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
    ...payload,
  }),
  [SET_USD_UAH_VALUE]: (state, { payload }) => ({
    ...state,
    ...payload,
  }),
  [SET_EUR_VALUE]: (state, { payload }) => ({
    ...state,
    ...payload,
  }),
  [SET_EUR_UAH_VALUE]: (state, { payload }) => ({
    ...state,
    ...payload,
  }),
  [SET_FIRST_CURRENCY_NAME]: (state, { payload }) => ({
    ...state,
    ...payload,
  }),
  [SET_SECOND_CURRENCY_NAME]: (state, { payload }) => ({
    ...state,
    ...payload,
  }),
  [SET_FIRST_CURRENCY]: (state, { payload }) => ({
    ...state,
    ...payload,
    loading: false,
  }),
  [SET_SECOND_CURRENCY]: (state, { payload }) => ({
    ...state,
    ...payload,
  }),
  [GET_CUSTOM_EXCHANGE_RATE]: (state, { payload }) => ({
    ...state,
    ...payload,
  }),
  [SET_LOADING]: (state) => ({ ...state, loading: true }),
  DEFAULT: (state) => state,
};

export const CurrencyConverterReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
