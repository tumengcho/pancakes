import "../design-home.css";
import React, { useEffect, useReducer } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "owl.carousel/dist/owl.carousel.min.js";
import { Link } from "react-router-dom";
import axios from "axios";
import logger from "use-reducer-logger";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

var imageBasePath =
  window.location.protocol + "//" + window.location.host + "/Images/";
export default function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };

    fetchData();
  }, []);
  return (
    <main>
      <div class="section-one px-3 text-white">
        <OwlCarousel
          className=" owl-carousel h-100"
          autoplay
          loop
          center
          rewind={false}
          dots={true}
          navText={[
            "<i class='fa fa-angle-left'></i>",
            "<i class='fa fa-angle-right'></i>",
          ]}
          responsive={{
            0: { items: 1, margin: 10 },
            576: { nav: true, items: 1 },
          }}
        >
          <img src={`${imageBasePath}section1.jpg`} className="w-100"></img>
          <img
            src={`${imageBasePath}promo_corteiz.webp`}
            className="w-100"
          ></img>
          <img
            src={`${imageBasePath}corteiz-promo.webp`}
            className="w-100"
          ></img>
        </OwlCarousel>
        {/*
        <div class="jumbotron shadow row text-center px-5 align-items-center h-100 w-100 m-0">
          <div>
            <h1 class="display-7 display-md-4">Step into Excellence.</h1>
            <p class="lead text-light">
              Where Comfort Meets Style, Every Stride Tells a Story!
            </p>
          </div>
        </div> */}
      </div>

      <div class="section-video row bg-light mx-md-5 mx-1 align-items-center">
        <video autoPlay muted loop className="col-md-6 p-0">
          <source src="Images/athlima-video.mp4" type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>

        <div class="content text-black col-md-6 pb-3 px-md-5">
          <h1 class="py-5 fw-bold fs-2">
            Souliers Impeccables Élégance Inédite
          </h1>
          <p>
            Explorez l'excellence du style avec nos souliers parfaits, état
            jamais porté. Chaque paire raconte une histoire d'élégance inédite,
            prête à compléter votre look avec une touche de perfection.
          </p>
        </div>
      </div>

      <div class="section-two mx-4">
        <div class="row text-center mx-md-5 my-4">
          <div class="card bg-black text-white col-md-4">
            <img
              class="card-img-top"
              src={`${imageBasePath}clothes_1.jpg`}
              alt="Card image cap"
            />
            <div class="card-body">
              <h5 class="card-title">Clothes</h5>
              <a href="#" class="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
          <div class="card bg-black text-white col-md-4 ">
            <img
              class="card-img-top"
              src={`${imageBasePath}shoes.jpg`}
              alt="Card image cap"
            />
            <div class="card-body">
              <h5 class="card-title">Shoes</h5>
              <a href="#" class="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
          <div class="card bg-black text-white col-md-4">
            <img
              class="card-img-top"
              src={`${imageBasePath}pexels-lucas-pezeta-2079149.jpg`}
              alt="Card image cap"
            />
            <div class="card-body">
              <h5 class="card-title">Jersey</h5>
              <a href="#" class="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
