import React from "react";
import ExchangeRate from "../ExchangeRate/ExchangeRate";
import "./Navigation.scss";

export default function Navigation() {
  return (
    <div className="navigation_container">
      <ul className="navigation_list">
        <li className="navigation_item">Home</li>
        <li className="navigation_item">Exchange</li>
        <li className="navigation_item">About US</li>
      </ul>
      <ExchangeRate></ExchangeRate>
    </div>
  );
}
