import React, { useEffect, useReducer, useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logger from 'use-reducer-logger';
import MessageBox from '../components/MessageBox';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function Products() {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: error.message });
      }
    };

    fetchData();
  }, []);
  return (
    <Container className="produits">
      <h1 className="titre fs-5 mb-5">Tous nos produits</h1>
      <Container>
        <Row className="mb-5">
          <h2 className="titre fs-6 fw-semibold">Souliers</h2>
          {products
            .filter((produit) => produit.category === 'shoes')
            .map((produit) => (
              <Col xs={6} sm={4} md={3} className="mt-5">
                {loading ? (
                  <div className="text-black">
                    <h1>Loading...</h1>
                  </div>
                ) : error ? (
                  <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                  <div>
                    <Link
                      to={`/products/${produit.slug}`}
                      className="text-black"
                      style={{ textDecoration: 'none' }}
                    >
                      <div className="card-img" style={{ height: 'auto' }}>
                        <img
                          src={produit.image}
                          className=""
                          alt={produit.name}
                        ></img>
                      </div>
                    </Link>
                    <h1 className="mt-2  fs-sm-4 fs-6">{produit.name}</h1>
                    <p>{produit.price}$</p>
                  </div>
                )}
              </Col>
            ))}
        </Row>

        <Row className="mt-5">
          <h2 className="titre fs-6 fw-semibold ">Vétements</h2>
          {products
            .filter((produit) => produit.category === 'clothes')
            .map((produit) => (
              <Col xs={6} sm={4} md={3} className="mt-5">
                {loading ? (
                  <div className="text-black">
                    <h1>Loading...</h1>
                  </div>
                ) : error ? (
                  <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                  <Link
                    to={`/products/${produit.slug}`}
                    className="text-black"
                    style={{ textDecoration: 'none' }}
                  >
                    <img
                      src={produit.image}
                      className=""
                      alt={produit.name}
                    ></img>
                    <h1 className="mt-2  fs-sm-4 fs-6">{produit.name}</h1>
                    <p>{produit.price}$</p>
                  </Link>
                )}
              </Col>
            ))}
        </Row>
      </Container>
    </Container>
  );
}
