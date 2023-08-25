import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import data from '../data';

export default function HomeScreen() {
  return (
    <div>
      <div className="section1">
        <div className="sSection1 align-items-center">
          <Container>
            <h1 className="text-uppercase fs-1 fw-bold mb-2">Par et pour des passionnés.</h1>
            <p className="description1 fs-sm-5  mb-3">Commandez maintenant, livraison disponible partout au Canada.</p>
            <button className="btn btn-light">En savoir plus</button>
          </Container>
        </div>
      </div>
      
      <Container className="mb-5" style={{maxWidht:'900px'}}>
        <h1 className="fw-normal fs-1 mb-1" >À propos de nous.</h1>
        <p className="description1 mb-5 fs-5-sm  fw-normal">Nous avons créé Athlima Plug dans un seul et unique but, rendre l'achat des chaussures plus facile.s</p>
        <hr></hr>
        <Row className='mt-5'>
          <Col md={6} >
            <p className=" description1 fw-light px-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.</p>
          </Col>
          <Col md={6}>
            <p className="description1 fw-light px-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.</p>
          </Col>
        </Row>
      </Container>
      
        <Row className="mt-3 mb-5 pt-5 container-fluid">
          <div className='mb-3'>
          <h1 className='fw-normal pt-5 fs-3 text-center'>Nos Produit</h1>
          <p className='description1 fw-normal text-center mb-5'>Découvrez les tendances du moment.</p>
          </div>
          
          <Col md={3} className="order-md-1 order-0">
            <div className='cat-shoes ps-3 w-100 h-100 pt-md-5'>
              <h1 className='fs-3 fw-bold text-uppercase text-white'>Souliers</h1>
              <p className='text-light'>Voir tout</p>
            </div>
          </Col>
          <Col md={3}  className="order-md-1 order-0">
            <img
              src="/Images/jordan4.png"
              className="element-1"
              alt="who-am-i"
            ></img>
            <h1 className='mt-2 fs-4'>Jordan 4s Military</h1>
            <p>450.00$</p>
          </Col>
          <Col md={3}  className="order-md-1 order-0">
            <img
              src="/Images/jordan4.png"
              className="element-1"
              alt="who-am-i"
            ></img>
            <h1 className='mt-2 fs-4'>Jordan 4s Military</h1>
            <p>450.00$</p>
          </Col>
          <Col md={3}  className="order-md-1 order-0">
            <img
              src="/Images/jordan4.png"
              className="element-1"
              alt="who-am-i"
            ></img>
            <h1 className='mt-2 fs-4'>Jordan 4s Military</h1>
            <p>450.00$</p>
          </Col>
        </Row>

        <Row className="mt-3 mb-5 pt-5 container-fluid">
          
          
          <Col md={3} className="order-md-1 order-0">
            <div className='cat-vetement ps-3 w-100 h-100 pt-md-5'>
              <h1 className='fs-3 fw-bold text-white text-uppercase'>Vêtements</h1>
              <p className='text-light'>Voir tout</p>
            </div>
          </Col>
          <Col md={3}  className="order-md-1 order-0">
            <img
              src="/Images/jordan4.png"
              className="element-1"
              alt="who-am-i"
            ></img>
            <h1 className='mt-2 fs-4'>Jordan 4s Military</h1>
            <p>450.00$</p>
          </Col>
          <Col md={3}  className="order-md-1 order-0">
            <img
              src="/Images/jordan4.png"
              className="element-1"
              alt="who-am-i"
            ></img>
            <h1 className='mt-2 fs-4'>Jordan 4s Military</h1>
            <p>450.00$</p>
          </Col>
          <Col md={3}  className="order-md-1 order-0">
            <img
              src="/Images/jordan4.png"
              className="element-1"
              alt="who-am-i"
            ></img>
            <h1 className='mt-2 fs-4'>Jordan 4s Military</h1>
            <p>450.00$</p>
          </Col>
        </Row>

        {/* <Container className="mt-5">
          <Row>
            {data.packages.map((product) => (
              <Col md={4} className="text-center">
                <div>
                  <img
                    className="img-package"
                    src={product.image}
                    alt={product.name}
                  ></img>
                  <h3 className="mt-3 fw-normal">{product.name}</h3>
                  <p className="mt-3 fs-7 px-5 fw-light">
                    {product.description}
                  </p>
                </div>
              </Col>
            ))}
          </Row>
        </Container> */}
      
    </div>
  );
}
