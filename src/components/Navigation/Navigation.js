import React, { useContext, useEffect, useState } from "react";
import ExchangeRate from "../ExchangeRate/ExchangeRate";
import { NavLink } from "react-router-dom";
import "./Navigation.scss";
import { CurrencyConverterContext } from "../../context/CurrencyConverter/CurrencyConverterContext";

export default function Navigation() {
  const [AlertShow, setAlertShow] = useState(true);
  const toggleAlert = () => {
    setAlertShow(!AlertShow);
  };
  const CurrencyConverter = useContext(CurrencyConverterContext);

  useEffect(() => {
    CurrencyConverter.getCurrencyExchangeRate();
  }, []);

  return (
    <React.Fragment>
      <div className="navigation_container">
        <nav className="navigation_list">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "navigation_item navigation_active-link"
                : "navigation_item"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/currency-converter"
            exact="true"
            className={({ isActive }) =>
              isActive
                ? "navigation_item navigation_active-link"
                : "navigation_item"
            }
          >
            Exchange
          </NavLink>
          <NavLink
            to="/about"
            exact="true"
            className={({ isActive }) =>
              isActive
                ? "navigation_item navigation_active-link"
                : "navigation_item"
            }
          >
            About Project
          </NavLink>
        </nav>
        <ExchangeRate></ExchangeRate>{" "}
      </div>
      <div
        className={
          AlertShow ? "navigation_alert" : "navigation_alert alert_close"
        }
      >
        <p>
          To use API request temporary access to the demo server by{" "}
          <a
            href="https://cors-anywhere.herokuapp.com/corsdemo"
            target="_blank"
            rel="noreferrer"
          >
            link
          </a>
        </p>
        <span onClick={toggleAlert}>X</span>
      </div>
    </React.Fragment>
  );
}
