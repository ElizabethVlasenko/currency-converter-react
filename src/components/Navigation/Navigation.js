import React, { useState } from "react";
import ExchangeRate from "../ExchangeRate/ExchangeRate";
import "./Navigation.scss";

export default function Navigation() {
  const [AlertShow, setAlertShow] = useState(true);
  const toggleAlert = () => {
    setAlertShow(!AlertShow);
  };

  return (
    <React.Fragment>
      <div className="navigation_container">
        <nav className="navigation_list">
          <a className="navigation_item">Home</a>
          <a className="navigation_item">Exchange</a>
          <a className="navigation_item">About US</a>
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
          >
            link
          </a>
        </p>
        <span onClick={toggleAlert}>X</span>
      </div>
    </React.Fragment>
  );
}
