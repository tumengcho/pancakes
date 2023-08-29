import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import data from '../data';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';

export default function Product() {
  return (
    <Container className="produits">
      <h1 className="titre fs-5 mb-5">Tous nos produits</h1>
      <Container>
        <Row className="mb-5">
          <h2 className="titre fs-6 fw-semibold">Souliers</h2>
          {data.products
            .filter(
              (produit) => produit.category === 'shoes' && produit.vedette
            )
            .map((produit) => (
              <Col xs={6} sm={4} md={3} className="mt-5">
                <div className="card-img" style={{ height: 'auto' }}>
                  <img
                    src={produit.image + '.webp'}
                    className=""
                    alt={produit.name}
                  ></img>
                </div>
                <h1 className="mt-2  fs-sm-4 fs-6">{produit.name}</h1>
                <p>{produit.price}$</p>
              </Col>
            ))}
        </Row>

        <Row className="mt-5">
          <h2 className="titre fs-6 fw-semibold ">Vétements</h2>
          {data.products
            .filter(
              (produit) => produit.category === 'clothes' && produit.vedette
            )
            .map((produit) => (
              <Col xs={6} sm={4} md={3} className="mt-5">
                <img
                  src={produit.image + '.webp'}
                  className=""
                  alt={produit.name}
                ></img>
                <h1 className="mt-2  fs-sm-4 fs-6">{produit.name}</h1>
                <p>{produit.price}$</p>
              </Col>
            ))}
        </Row>
      </Container>
    </Container>
  );
}
