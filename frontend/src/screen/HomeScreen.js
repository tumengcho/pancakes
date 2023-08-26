import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import data from '../data';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'owl.carousel/dist/owl.carousel.min.js';
export default function HomeScreen() {
  return (
    <div>
      <div className="section1">
        <div className="sSection1 align-items-center">
          <Container>
            <h1 className="text-uppercase fs-1 fw-bold mb-2">
              Par et pour des passionnés.
            </h1>
            <p className="description1 fs-sm-5  mb-3">
              Commandez maintenant, livraison disponible partout au Canada.
            </p>
            <button className="btn btn-light">En savoir plus</button>
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
            <p className=" description1 titre fw-light px-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique. Duis cursus,
              mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam
              libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum
              lorem imperdiet. Nunc ut sem vitae risus tristique posuere.
            </p>
          </Col>
          <Col md={6}>
            <p className="description1 titre fw-light px-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique. Duis cursus,
              mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam
              libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum
              lorem imperdiet. Nunc ut sem vitae risus tristique posuere.
            </p>
          </Col>
        </Row>
      </Container>
      <div className="mb-3">
        <h1 className="fw-semi-bold pt-5 fs-3 text-uppercase text-center">
          Nos Produits
        </h1>
        <p className="description1 fw-normal text-center mb-5">
          Découvrez les tendances du moment.
        </p>
      </div>
      <Container>
        <Row className="mb-5 w-100" style={{ minHeight: '150px' }}>
          <Col md={3}>
            <div className="cat-shoes ps-3 pt-md-5">
              <h1 className="fs-3 fw-bold text-white text-uppercase">
                Souliers
              </h1>
              <p className="text-light">Voir tout</p>
            </div>
          </Col>
          <Col md={9}>
            <OwlCarousel
              className=" owl-carousel mt-3 px-5 container-fluid"
              loop
              nav
              dots={false}
              margin={0}
              padding={0}
              autoPlay
              autoplayTimeout={6000}
              autoplayHoverPause
              navText={[
                "<i class='fa fa-angle-left' style='background-color:white;'></i>",
                "<i class='fa fa-angle-right' style='background-color:white;'></i>",
              ]}
              responsive={{
                0: { items: 2 },
                576: { items: 3, margin: 50 },
              }}
            >
              {data.products
                .filter(
                  (produit) => produit.category === 'shoes' && produit.vedette
                )
                .map((produit) => (
                  <div>
                    <img
                      src={produit.image}
                      className="w-50"
                      alt={produit.name}
                    ></img>
                    <h1 className="mt-2  fs-sm-4 fs-6">{produit.name}</h1>
                    <p>{produit.price}$</p>
                  </div>
                ))}
            </OwlCarousel>
          </Col>
        </Row>
        <Row>
          <Col md={3}>
            <div className="cat-vetement ps-3  pt-md-5">
              <h1 className="fs-3 fw-bold text-white text-uppercase">
                Vêtements
              </h1>
              <p className="text-light">Voir tout</p>
            </div>
          </Col>
          <Col md={9}>
            <OwlCarousel
              className=" owl-carousel mt-3 px-5 container-fluid"
              loop
              nav
              dots={false}
              margin={0}
              padding={0}
              autoPlay
              autoplayTimeout={6000}
              autoplayHoverPause
              navText={[
                "<i class='fa fa-angle-left' style='background-color:white;'></i>",
                "<i class='fa fa-angle-right' style='background-color:white;'></i>",
              ]}
              responsive={{
                0: { items: 2 },
                576: { items: 3, margin: 50 },
              }}
            >
              {data.products
                .filter(
                  (produit) => produit.category === 'clothes' && produit.vedette
                )
                .map((produit) => (
                  <div>
                    <img
                      src={produit.image}
                      className="w-50"
                      alt={produit.name}
                    ></img>
                    <h1 className="mt-2  fs-sm-4 fs-6">{produit.name}</h1>
                    <p>{produit.price}$</p>
                  </div>
                ))}
            </OwlCarousel>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className="my-5 px-4 py-5 align-items-center bg-light text-white container-fluid">
          <Col md={6}>
            <img
              src="./Images/back2school.jpg"
              className="promo w-100"
              alt="Back2School"
            ></img>
          </Col>
          <Col md={6}>
            <h1 className="titre pt-5 fw-bold text-black text-uppercase fs-1 fst-italic">
              Back to school
            </h1>
            <p className="description1 fst-italic my-5">
              Préparez-vous à fouler le chemin de la réussite avec style :
              Découvrez notre collection de chaussures pour un retour à la
              rentrée qui fera sensation à chaque pas !
            </p>
            <button type="button" class="btn btn-outline-dark">
              <p className="titre pt-1">Découvrez Maintenant</p>
            </button>
          </Col>
        </Row>
      </Container>
      <Container className="mt-5 ps-5 pt-5">
        <h1 className="text-uppercase titre1 fs-5 fw-bold mb-4">
          #Athlima-Plug
        </h1>
        <p>
          Joignez-vous à notre communauté de passionnés de chaussures !
          Suivez-nous sur les réseaux sociaux pour des mises à jour exclusives,
          des offres spéciales et une dose quotidienne d'inspiration mode.
        </p>
        <div className="mt-4">
          <a
            className="d-inline me-2 mt-3"
            href="https://www.instagram.com/athlima_plug/"
          >
            <img className="logo d-inline" src="./Images/insta.svg"></img>
          </a>
          <a
            className="d-inline px-2"
            href="https://www.tiktok.com/@athlima_plug?_t=8f4J3qw27hm&_r=1"
          >
            <img className="logo d-inline" src="./Images/tiktok.svg"></img>
          </a>
        </div>
      </Container>
    </div>
  );
}
