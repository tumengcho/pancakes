import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "../Store";
import CheckoutSteps from "../components/CheckoutSteps";
import Container from "react-bootstrap/esm/Container";

export default function ShippingScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;
  useEffect(() => {
    if (!userInfo) {
      navigate("/signin?redirect=/shipping");
    }
  }, [userInfo, navigate]);

  const [fullName, setFullName] = useState(shippingAddress.fullName || "");
  const [address, setAdress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: {
        fullName,
        country,
        address,
        postalCode,
        city,
      },
    });

    localStorage.setItem(
      "shippingAddress",
      JSON.stringify({
        fullName,
        country,
        address,
        postalCode,
        city,
      })
    );
    navigate("/payment");
  };

  return (
    <div className="mb-5 pb-5 text-white px-md-3">
      <Helmet>
        <title>Shipping Adress</title>
      </Helmet>
      <div className="container pt-5">
        <CheckoutSteps step1 step2></CheckoutSteps>
      </div>

      <h1 className="py-5 text-center">Shipping Address</h1>
      <div
        class="row mt-3 mx-0 py-5 w-100 gradient-custom"
        style={{ marginTop: "25px" }}
      >
        <div class="col-md-3">
          <div
            style={{ marginTop: "50px", marginLeft: "10px;" }}
            class="text-center"
          >
            <i
              id="animationDemo"
              data-mdb-animation="slide-right"
              data-mdb-toggle="animation"
              data-mdb-animation-reset="true"
              data-mdb-animation-start="onScroll"
              data-mdb-animation-on-scroll="repeat"
              class="fas fa-3x fa-shipping-fast text-white"
            ></i>
            <h3 class="mt-3 text-white">Welcome</h3>
            <p class="white-text">
              You are 30 seconds away from compleating your order!
            </p>
          </div>
          <div class="text-center mb-4">
            <Link to="/produits">
              <button
                type="submit"
                class="btn btn-white btn-rounded text-white back-button"
              >
                Go back
              </button>
            </Link>
          </div>
        </div>
        <div class="col-md-9 justify-content-center">
          <div
            class="card pb-4"
            style={{
              borderBottomLeftRadius: "10% 50%",
              borderTopLeftRadius: "10% 50%",
            }}
          >
            <div class="card-body mt-0 mx-5">
              <div class="text-center mb-3 pb-2 mt-3">
                <h4>Delivery Details</h4>
              </div>

              <form class="mb-0" onSubmit={submitHandler}>
                <div class="row mb-4">
                  <div class="col-12 col-md-6">
                    <div class="form-outline">
                      <label class="form-label" for="FirstName">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="FirstName"
                        class="form-control input-custom"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div class="col-12 col-md-6">
                    <div class="form-outline">
                      <label class="form-label" for="Country">
                        Country
                      </label>
                      <input
                        type="text"
                        id="Country"
                        class="form-control input-custom"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div class="row mb-4">
                  <div class="col-12 col-md-6">
                    <div class="form-outline">
                      <label class="form-label" for="city">
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        class="form-control input-custom"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div class="col-12 col-md-6">
                    <div class="form-outline">
                      <label class="form-label" for="postalCode">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        id="postalCode"
                        class="form-control input-custom"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div class="row mb-4">
                  <div class="col-12 col-md-6">
                    <div class="form-outline">
                      <label class="form-label" for="address">
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        class="form-control input-custom"
                        value={address}
                        onChange={(e) => setAdress(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div class="col-12 col-md-6">
                    <div class="form-outline">
                      <label class="form-label" for="typeEmail">
                        Email
                      </label>
                      <input
                        type="email"
                        id="typeEmail"
                        class="form-control input-custom"
                        placeholder="Optionnal"
                      />
                    </div>
                  </div>
                </div>

                <div class="w-100 ">
                  <button type="submit" class="p-0 w-100  bg-black">
                    <p className="btn-submit text-white fs-6 pt-2">
                      Place Order
                    </p>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
