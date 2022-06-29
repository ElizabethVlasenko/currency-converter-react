import React from "react";
import ExchangeRate from "../ExchangeRate/ExchangeRate";
import "./Navigation.scss";

export default function Navigation() {
  return (
    <div>
      Navigation<ExchangeRate></ExchangeRate>
      <button
        onClick={() => {
          localStorage.removeItem("expirationDate");
        }}
      >
        Remove expirationDate
      </button>
    </div>
  );
}
