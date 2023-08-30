import React, { useEffect, useReducer } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'owl.carousel/dist/owl.carousel.min.js';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logger from 'use-reducer-logger';

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

export default function HomeScreen() {
  console.log(__dirname);
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
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };

    fetchData();
  }, []);
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
              className=" owl-carousel mt-3 px-md-5  container-fluid"
              nav
              loop
              dots={false}
              margin={30}
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
              {products
                .filter(
                  (produit) => produit.category === 'shoes' && produit.vedette
                )
                .map((produit) => (
                  <Link
                    to={`/products/${produit.slug}`}
                    className="text-black"
                    style={{ textDecoration: 'none' }}
                  >
                    <div>
                      <img
                        loading="lazy"
                        srcset={`${produit.image} 1x, ${produit.image} 2x`}
                        style={{
                          maxHeight: '120px',
                          gridRow: 'image',
                          height: 'auto',
                        }}
                        src={produit.image}
                        alt={produit.name}
                      ></img>
                      <h1 className="mt-2  fs-sm-4 fs-6">{produit.name}</h1>
                      <p>{produit.price}$</p>
                    </div>
                  </Link>
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
              className=" owl-carousel mt-3 px-md-5 px-md-3 container-fluid"
              loop
              nav
              dots={false}
              margin={30}
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
              {products
                .filter(
                  (produit) => produit.category === 'clothes' && produit.vedette
                )
                .map((produit) => (
                  <Link
                    to={`/products/${produit.slug}`}
                    className="text-black"
                    style={{ textDecoration: 'none' }}
                  >
                    <div>
                      <img
                        loading="lazy"
                        srcset={`${produit.image} 1x, ${produit.image} 2x`}
                        src={produit.image}
                        alt={produit.name}
                        style={{ maxHeight: '200px' }}
                      ></img>
                      <h1 className="mt-2  fs-sm-4 fs-6">{produit.name}</h1>
                      <p>{produit.price}$</p>
                    </div>
                  </Link>
                ))}
            </OwlCarousel>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className="my-5 px-4 py-5 align-items-center bg-light text-white container-fluid">
          <Col md={6}>
            <img
              loading="lazy"
              srcSet="./Images/back2school-small 200w, ./Images/back2school-medium 763w,./Images/back2school-large 1126w,./Images/back2school-xlarge 1400w,"
              className="img-rounded"
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
            <img
              loading="lazy"
              className="logo d-inline"
              src="./Images/insta.svg"
            ></img>
          </a>
          <a
            className="d-inline px-2"
            href="https://www.tiktok.com/@athlima_plug?_t=8f4J3qw27hm&_r=1"
          >
            <img
              loading="lazy"
              className="logo d-inline"
              src="./Images/tiktok.svg"
            ></img>
          </a>
        </div>
      </Container>
    </div>
  );
}
