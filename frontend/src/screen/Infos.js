import React from 'react';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';

export default function Infos() {
  return (
    <div>
      <div className="section2 mt-5">
        <div className="sSection1 align-items-center">
          <Container>
            <h1 className="text-uppercase fs-1 fw-bold mb-2">
              Par et pour des passionnés.
            </h1>
            <p className="description1 fs-sm-5  mb-3">
              Commandez maintenant, livraison disponible partout au Canada.
            </p>
          </Container>
        </div>
      </div>
      <Container className="mb-5" style={{ maxWidth: '1000px' }}>
        <h1 className="fw-bold text-uppercase text-md-start text-sm-center fs-3 titre mb-1">
          À propos de nous.
        </h1>
        <p className="description1 titre mb-5 fs-5-sm  fw-normal">
          Nous avons créé Athlima Plug dans un seul et unique but, rendre
          l'achat des chaussures plus facile
        </p>
        <hr></hr>
        <Row className="mt-5">
          <Col md={6}>
            <p className="description1 titre fw-light px-2">
              Notre parcours a été marqué par la recherche inlassable des
              chaussures les plus élégantes et durables, reflétant les tendances
              les plus actuelles. Chaque paire que nous proposons raconte une
              histoire de qualité et de style. Nous comprenons l'importance de
              se sentir bien dans ses chaussures, c'est pourquoi nous mettons
              tout en œuvre pour que chaque achat soit une expérience
              satisfaisante. Rejoignez-nous dans cette aventure de la mode
              responsable et de l'élégance intemporelle.
            </p>
          </Col>
          <Col md={6}>
            <p className=" description1 titre fw-light px-2">
              Fondée avec passion, notre entreprise de revente de chaussures
              puise son inspiration dans l'amour du style individuel. Chaque
              paire de chaussures raconte une histoire, façonnée par des
              tendances et des aventures uniques. Notre engagement envers la
              qualité, l'authenticité et la satisfaction du client nous guide
              dans la création d'une expérience de shopping qui célèbre
              l'unicité à chaque pas.
            </p>
          </Col>
        </Row>
        <div className="grid-container my-5">
          <div className="grid-item1 bg-dark"></div>
          <div className="grid-item2 bg-success"></div>
          <div className="grid-item3 bg-warning"></div>
        </div>
        <Container className="text-center p-5" style={{ maxWidth: '700px' }}>
          <h1 className=" my-3 fw-semibold fs-3">Notre Philosophie</h1>
          <p className="description1 fs-5 px-3">
            Le bonheur se trouve dans les détails. C'est dans la qualité des pas
            que réside la plénitude de la marche.
          </p>
          <cite className="blockquote-footer" title="Confucius">
            Confucius
          </cite>
        </Container>
      </Container>
    </div>
  );
}
