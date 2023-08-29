import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Product() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/products');
      setProducts(result.data);
    };
  });
  return (
    <Container className="produits">
      <h1 className="titre fs-5 mb-5">Tous nos produits</h1>
      <Container>
        <Row className="mb-5">
          <h2 className="titre fs-6 fw-semibold">Souliers</h2>
          {products
            .filter(
              (produit) => produit.category === 'shoes' && produit.vedette
            )
            .map((produit) => (
              <Col xs={6} sm={4} md={3} className="mt-5">
                <Link
                  to={`/slug/${produit.slug}`}
                  className="text-black"
                  style={{ textDecoration: 'none' }}
                >
                  <div className="card-img" style={{ height: 'auto' }}>
                    <img
                      src={produit.image + '.webp'}
                      className=""
                      alt={produit.name}
                    ></img>
                  </div>
                </Link>
                <h1 className="mt-2  fs-sm-4 fs-6">{produit.name}</h1>
                <p>{produit.price}$</p>
              </Col>
            ))}
        </Row>

        <Row className="mt-5">
          <h2 className="titre fs-6 fw-semibold ">Vétements</h2>
          {products
            .filter(
              (produit) => produit.category === 'clothes' && produit.vedette
            )
            .map((produit) => (
              <Link
                to={`/slug/${produit.slug}`}
                className="text-black"
                style={{ textDecoration: 'none' }}
              >
                <Col xs={6} sm={4} md={3} className="mt-5">
                  <img
                    src={produit.image + '.webp'}
                    className=""
                    alt={produit.name}
                  ></img>
                  <h1 className="mt-2  fs-sm-4 fs-6">{produit.name}</h1>
                  <p>{produit.price}$</p>
                </Col>
              </Link>
            ))}
        </Row>
      </Container>
    </Container>
  );
}