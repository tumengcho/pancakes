import React, { useEffect, useReducer } from "react";
import { getError } from "../utils";
import axios from "axios";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "../product.css";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function Recommendation({ description, id }) {
  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const data = await axios.get("/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: data.data });
        console.log(product);
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, []);

  const produitFiltres = product.filter((product) => {
    if (description === product.description && product._id !== id) {
      return product;
    }
  });
  console.log(produitFiltres);
  return produitFiltres.length === 0 ? (
    ""
  ) : (
    <div className="row w-100 mt-5 ms-3">
      <h1 className="fs-4 text-white titre mt-5">You might also like</h1>
      <OwlCarousel
        className=" owl-carousel container-fluid row"
        nav
        rewind={false}
        dots={false}
        navText={[
          "<i class='fa fa-angle-left'></i>",
          "<i class='fa fa-angle-right'></i>",
        ]}
        responsive={{
          0: { items: 2 },
          576: { items: 3 },
          1000: { items: 4 },
        }}
      >
        {produitFiltres.map((produit) => (
          <div className="bg-white text-center border border-2 border-danger rounded-4 text-dark w-100">
            <Link
              to={`/products/${produit.slug}`}
              className=" bg-white"
              style={{ textDecoration: "none" }}
            >
              <div className="card-img" style={{ height: "auto" }}>
                <img src={produit.image} className="" alt={produit.name}></img>
              </div>
            </Link>
            <h1 className="mt-2 titre fs-sm-4 fs-6">{produit.name}</h1>
            <p className="price">{produit.price}$</p>
          </div>
        ))}
      </OwlCarousel>
    </div>
  );
}
