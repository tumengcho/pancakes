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
            <h2 className="text-uppercase fw-bold mb-2">Par et pour des passionnés.</h2>
            <p className="description1 fs-4 mb-3">Commandez maintenant, livraison disponible partout au Canada.</p>
            <button className="btn btn-light">En savoir plus</button>
          </Container>
        </div>
      </div>
      
      <Container className="mb-5" style={{maxWidht:'900px'}}>
        <h1 className="fw-normal mb-1" >À propos de nous.</h1>
        <p className="description1 mb-5 fs-5 fw-normal">Nous avons créé Athlima Plug dans un seul et unique but, rendre l'achat des chaussures plus facile</p>
        <hr></hr>
        <Row className='mt-5'>
          <Col md={6} >
            <p className=" description1 fw-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.</p>
          </Col>
          <Col md={6}>
            <p className="description1 fw-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.</p>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className="align-items-center mb-5">
          <Col md={6} className="order-md-0 order-1 px-md-5">
            <h5 className="pb-md-3 pt-3">ABOUT</h5>
            <h1 className="mb-4 pt-xs-5 title ">Who am I?</h1>
            <p className="desc1  mb-md-5">
              I am a decent/efficient Video Editor with over 2.5+ (2020-now)
              years of experience in video editing , but mostly been inspired
              early on in video editing.
            </p>
            <button className="btn-section">Learn More</button>
          </Col>
          <Col md={6} className="order-md-1 order-0">
            <img
              src=""
              className="element-1"
              alt="who-am-i"
            ></img>
          </Col>
        </Row>
        <Row className="align-items-center mb-3">
          <Col md={6} className="order-md-0 order-0">
            <img
              src=""
              className="element-1"
              alt="who-am-i"
            ></img>
          </Col>
          <Col md={6} className="order-md-0 order-1 px-md-5">
            <h5 className="pb-md-3 ps-md-5 pt-3">ABOUT</h5>

            <h1 className="mb-4 px-md-5 pt-md-0 pt-xs-5 title">
              Why choose me?
            </h1>
            <p className="px-md-5 mb-4 desc">
              I am simple, friendly and professional. If there is any issue i
              deliver quick responses and I will always deliver on time.
            </p>
            <button className=" ms-md-5 btn-section">Learn More</button>
          </Col>
        </Row>
        <Row className="align-items-center mt-5">
          <Col md={6} className="order-md-0 order-1">
            <h5 className="pb-md-3 ps-md-5 pt-3">ABOUT</h5>

            <h1 className="mb-4 px-md-5 pt-md-0 pt-xs-5 title">
              How does the proccess work?
            </h1>
            <p className="px-md-5 mb-4 desc">
              <strong>Step 1:</strong> Send your pre-cut videos. <br />
              <br />
              <strong>Step 2:</strong> Logo (optional).
              <br />
              <br />
              <strong>Step 3:</strong> Send Example of the style you want of the
              project (optional).
            </p>
            <button className=" ms-md-5 btn-section">Learn More</button>
          </Col>
          <Col md={6} className="order-md-1 order-0">
            <img
              src=""
              className="element-1"
              alt="who-am-i"
            ></img>
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
      </Container>
    </div>
  );
}
