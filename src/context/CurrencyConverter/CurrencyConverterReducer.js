import {
  GET_EUR_EXCHANGE_RATE,
  GET_USD_EXCHANGE_RATE,
  SET_LOADING,
} from "../types";

const handlers = {
  [GET_USD_EXCHANGE_RATE]: (state, { payload }) => ({
    ...state,
    USDtoUAH: payload.USD_UAH,
    UAHtoUSD: payload.UAH_USD,
    loading: false,
  }),
  [GET_EUR_EXCHANGE_RATE]: (state, { payload }) => ({
    ...state,
    EURtoUAH: payload.EUR_UAH,
    UAHtoEUR: payload.UAH_EUR,
    loading: false,
  }),
  [SET_LOADING]: (state) => ({ ...state, loading: true }),
  DEFAULT: (state) => state,
};

export const CurrencyConverterReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
