import React, { useEffect, useReducer, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { Link } from "react-router-dom";
import axios from "axios";
import logger from "use-reducer-logger";
import MessageBox from "../components/MessageBox";
import Badge from "react-bootstrap/esm/Badge";

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

export default function Products() {
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
        dispatch({ type: "FETCH_FAIL", payload: error.message });
      }
    };

    fetchData();
  }, []);
  return (
    <Container className="produits text-white">
      <h1 className="titre fs-3 mb-5">Tous nos produits</h1>
      <Container>
        <Row className="mb-5">
          <h1 className="titre fs-4 fw-semibold">Souliers</h1>
          {products
            .filter((produit) => produit.category === "shoes")
            .map((produit) => (
              <Col xs={12} sm={4} md={3} className="mt-5 d-grid">
                {loading ? (
                  <div className="text-black">
                    <h1>Loading...</h1>
                  </div>
                ) : error ? (
                  <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                  <div className="d-flex text-white text-center border border-2 border-white rounded-4 bg-black">
                    <Link
                      to={`/products/${produit.slug}`}
                      className="text-white"
                      style={{ textDecoration: "none" }}
                    >
                      <div className="card-img" style={{ height: "auto" }}>
                        <div>
                          {produit.new ? <Badge>NEW</Badge> : ""}
                          {produit.promo ? (
                            <Badge bg="danger">PROMO</Badge>
                          ) : (
                            ""
                          )}
                        </div>

                        <img
                          src={produit.image}
                          className=""
                          alt={produit.name}
                        ></img>
                      </div>
                      <h1 className="mt-2 titre-prod fs-sm-4 fs-6">
                        {produit.name}
                      </h1>
                      <p className="price">{produit.price}$</p>
                    </Link>
                  </div>
                )}
              </Col>
            ))}
        </Row>

        <Row className="mt-5">
          <h2 className="titre fs-4 fw-semibold ">Vétements</h2>
          {products
            .filter((produit) => produit.category === "clothes")
            .map((produit) => (
              <Col xs={12} sm={4} md={3} className="mt-5 d-grid">
                {loading ? (
                  <div className="text-white">
                    <h1>Loading...</h1>
                  </div>
                ) : error ? (
                  <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                  <Link
                    to={`/products/${produit.slug}`}
                    className="d-flex"
                    style={{ textDecoration: "none" }}
                  >
                    <div className="text-white row align-items-center bg-black border mx-2 border-2 border-white rounded-4 text-center">
                      {produit.new ? <Badge>NEW</Badge> : ""}
                      {produit.promo ? <Badge bg="danger">PROMO</Badge> : ""}
                      <img
                        src={produit.image}
                        className="pb-4"
                        alt={produit.name}
                        style={{ maxHeight: "300px" }}
                      ></img>
                      <h1 className="mt-2 titre fs-sm-4 fs-6">
                        {produit.name}
                      </h1>
                      <p className="price">{produit.price}$</p>
                    </div>
                  </Link>
                )}
              </Col>
            ))}
        </Row>
        <Row className="mt-5">
          <h2 className="titre fs-6 fw-semibold ">Maillot</h2>
          {products
            .filter((produit) => produit.category === "jersey")
            .map((produit) => (
              <Col xs={12} sm={4} md={3} className="mt-5 d-grid">
                {loading ? (
                  <div className="text-black">
                    <h1>Loading...</h1>
                  </div>
                ) : error ? (
                  <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                  <Link
                    to={`/products/${produit.slug}`}
                    className="text-black d-flex"
                    style={{ textDecoration: "none" }}
                  >
                    <div className="text-white bg-black border border-2 border-white rounded-4 text-center">
                      {produit.new ? <Badge>NEW</Badge> : ""}
                      {produit.promo ? (
                        <Badge pill bg="danger">
                          PROMO
                        </Badge>
                      ) : (
                        ""
                      )}
                      <img
                        src={produit.image}
                        className=""
                        alt={produit.name}
                        style={{ maxHeight: "300px" }}
                      ></img>
                      <h1 className="mt-2 titre fs-sm-4 fs-6">
                        {produit.name}
                      </h1>
                      <p className="price">{produit.price}$</p>
                    </div>
                  </Link>
                )}
              </Col>
            ))}
        </Row>
      </Container>
    </Container>
  );
}
