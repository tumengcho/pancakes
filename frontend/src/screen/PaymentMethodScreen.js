import React, { useContext, useEffect, useState } from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import { Helmet } from "react-helmet-async";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Store } from "../Store";
import { useNavigate } from "react-router-dom";

export default function PaymentMethodScreen() {
  const navigate = useNavigate();

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

  const { state, dispatch: ctxDispatch } = useContext(Store);

  const {
    cart: { shippingAddress, paymentMethod },
  } = state;

  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || "Paypal"
  );

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: "SAVE_PAYMENT_METHOD",
      payload: paymentMethodName,
    });
    localStorage.setItem("paymentMethod", paymentMethodName);
    navigate("/placeorder");
  };

  itemClick(".btn-payment");

  return (
    <div className="container text-white pt-5">
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="container" style={{ maxWidth: "900px" }}>
        <Helmet>
          <title> Payment Method</title>
        </Helmet>
        <h1 className="my-3">Payment Method</h1>
        <Form onSubmit={submitHandler} className="my-5">
          <div className="mb-3 row align-items-center">
            {/* <Form onSubmit={submitHandler}>
            <Form.Check
              type="radio"
              id="PayPal"
              label="Paypal"
              value="PayPal"
              checked={paymentMethodName === 'PayPal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </Form> */}
            <div
              className="col-md-6 border mb-4 mb-md-0 border-1 border-white rounded-2 bg-white btn-payment"
              onClick={() => setPaymentMethod("PayPal")}
            >
              <img src="Images/paypal.jpg" className="payment mx-auto"></img>
            </div>
            <div
              className="col-md-6 border border-1 border-white rounded-2 stripe btn-payment"
              onClick={() => setPaymentMethod("Stripe")}
            >
              <img src="Images/stripe.jpg" className="payment mx-auto"></img>
            </div>
            <div className="my-4"></div>
            <Button type="submit my-2 w-100">Continue</Button>
          </div>
        </Form>

        {/* <div className="mb-3">
          <Form onSubmit={submitHandler}>
            <Form.Check
              type="radio"
              id="Stripe"
              label="Stripe"
              value="Stripe"
              checked={paymentMethodName === "Stripe"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <div className="mb-3">
              <Button type="submit">Continue</Button>
            </div>
          </Form>
        </div> */}
      </div>
    </div>
  );
}
