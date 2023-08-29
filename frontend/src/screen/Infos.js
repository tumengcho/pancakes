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
              À propos de nous.
            </h1>
            <p className="description1 fs-sm-5  mb-3">
              D'un besoin à une nécessité.
            </p>
          </Container>
        </div>
      </div>
      <Container className="mb-5" style={{ maxWidth: '1000px' }}>
        <h1 className="fw-bold text-uppercase text-md-start text-sm-center fs-3 titre mb-1">
          Notre Histoire
        </h1>
        <p className="description1 titre mb-5 fs-5-sm  fw-normal">
          Découvrez nos motivations ainsi que l'histoire de notre entreprise.
        </p>
        <hr></hr>
        <Row className="mt-5">
          <Col md={6}>
            <p className="description1 titre fw-light px-2">
              Notre entreprise est née de la passion pour la chaussure et d'une
              vision : offrir à chacun la chance de posséder des chaussures de
              qualité exceptionnelle sans compromis. Nous croyons en la joie
              d'une paire de chaussures parfaite et nous nous engageons à rendre
              nos clients heureux en leur offrant des choix variés, un service
              attentionné et une expérience de satisfaction inégalée.
            </p>
          </Col>
          <Col md={6}>
            <p className=" description1 titre fw-light px-2">
              Chaque sourire sur le visage de nos clients est une récompense.
              Nous comprenons que les chaussures ne sont pas seulement des
              accessoires, mais des compagnons de chaque pas. C'est pourquoi
              nous nous efforçons de dépasser les attentes, en offrant des
              produits authentiques, des conseils avisés et un service
              personnalisé. Votre bonheur est notre succès et nous sommes fiers
              de vous accompagner à chaque pas de votre voyage.
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
