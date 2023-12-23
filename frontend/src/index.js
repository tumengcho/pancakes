import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from "./reportWebVitals";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { StoreProvider } from "./Store";
import { HelmetProvider } from "react-helmet-async";
window.onload = function () {
  itemClick(".btn-payment");
  itemClick(".nav-item");
};
window.addEventListener("scroll", priceLoad);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StoreProvider>
      <HelmetProvider>
        <PayPalScriptProvider deferLoading={true}>
          <App />
        </PayPalScriptProvider>
      </HelmetProvider>
    </StoreProvider>
  </React.StrictMode>
);

function itemClick(className) {
  let elementsArray = document.querySelectorAll(className);

  elementsArray.forEach(function (elem) {
    elem.addEventListener("click", function () {
      elementsArray.forEach(function (elem1) {
        elem1.classList.remove("active");
      });
      elem.classList.add("active");
    });
  });
}

function priceLoad() {
  var elementsArray = document.querySelectorAll(".price");
  for (let index = 0; index < elementsArray.length; index++) {
    var windowHeight = window.innerHeight;
    var revealTop = elementsArray[index].getBoundingClientRect().top;
    var revealPoint = 125;

    if (revealTop < windowHeight - revealPoint) {
      elementsArray[index].classList.add("show");
    } else {
      elementsArray[index].classList.remove("show");
    }
  }
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
