import React from "react";
import "./About.scss";

export default function About() {
  return (
    <div className="about_container">
      <h1 className="about_header">About the project</h1>
      <section className="about_section">
        <h2 className="about_title">Technical Task</h2>
        <p className="about_text">
          Create header with exchange rate and component with conversion.
        </p>
        <h3 className="about_subtitle">Header with exchange rate</h3>
        <p className="about_text">
          The header should display the current exchange rate (USD, EUR) against
          the hryvnia (UAH). The current exchange rate must come from any public
          API.
        </p>
        <h3 className="about_subtitle">Component with conversion</h3>
        <p className="about_text">
          One currency must have its own input and select. Input is given a
          number to indicate the number of units to convert. Select must contain
          at least three currencies - UAH, USD, EUR. Conversion must occur in
          both directions: when changing the value in the first currency, the
          value in the second must be recalculated, and vice versa. When
          changing the currency in each select, the conversion of both
          currencies should be recalculated correctly.
        </p>
        <p className="about_text">
          The advantage will be:{" "}
          <ul className="about_list">
            <li className="about_list-item">
              Well-designed interface and appearance
            </li>
            <li className="about_list-item">Clean code</li>
          </ul>
        </p>
        <p className="about_text">Use ReactJS or Angular 2+</p>
      </section>
      <section className="about_section">
        <h2 className="about_title">Realisation</h2>
        <h3 className="about_subtitle">Used technologies</h3>
        <ul className="about_list">
          <li className="about_list-item">React</li>
          <li className="about_list-item">React-hooks</li>
          <li className="about_list-item">React-Router</li>
          <li className="about_list-item">Axios</li>
        </ul>
        <h4 className="about_sub-subtitle">Used API</h4>
        <p className="about_text">
          For API I used a free version of{" "}
          <a href="https://www.currencyconverterapi.com/">
            CurrencyConverterApi.com
          </a>
        </p>
        <h3 className="about_subtitle">Design</h3>
        <p className="about_text">
          Design of this page was based on technical task and didn't contain a
          certain prototype. I've chosen green colors that are commonly
          associated with money.
        </p>
        <h4 className="about_sub-subtitle">Accessability</h4>
        <p className="about_text">
          All colors have been checked by{" "}
          <a href="https://webaim.org/resources/contrastchecker/">
            Contrast Checker
          </a>{" "}
          and passed the AAA (highest) WCAG 2.0 conformance level.
        </p>
        <h3 className="about_subtitle">Implementation</h3>
        <p className="about_text">
          For accessing data I used async functions with axios requests. As a
          global storage I used useRedux with useContext that allows me easily
          get information from the storage. I used eseEffect as
          ComponentDidMound() to load exchanging rates for UAH, USD, EUR and
          GBP. All numbers are rounded to 3 numbers after floating point.
        </p>
        <h3 className="about_subtitle">Evaluation</h3>
        <p className="about_text">
          I've created a header with exchange rate for UAH, USD and EUR. The
          component with conversion I created as a section with several blocks
          where the user can convert UAH and USD, UAH and EUR, UAH and GBP
          separately, but also last block where the user can choose any other
          currency from the list. All conversions are working in both ways and
          calculate correct value.
        </p>
        <h4 className="about_sub-subtitle">Further development</h4>
        <ul className="about_list">
          <li className="about_list-item">Add blog/news page.</li>
          <li className="about_list-item">
            Add option to see graph with previous exchanging rate for chosen
            currencies.
          </li>
          <li className="about_list-item">
            Add option get email with new exchanging rate for chosen currencies
          </li>
        </ul>
      </section>
    </div>
  );
}
