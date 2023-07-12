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
          <Container style={{ maxWidth: '400px' }}>
            <h2 className="section1-title mb-4">Edit whatever you need.</h2>
            <p className="section1-text">Some Text to put here.</p>
            <button className="btn btn-light">Learn More</button>
          </Container>
        </div>
      </div>
      <Container
        className="text-center"
        style={{ maxWidth: '900px', marginBottom: '10%' }}
      >
        <p className="mb-3 tDescription1">WHAT CAN I DO?</p>
        <h1 className="description1">
          I edit videos whether its a Tiktok, an Instagram Reel or a Youtube
          Short.
        </h1>
      </Container>
      <Container className="text-center mb-5">
        <hr></hr>
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
              src="/Images/who-am-i.jpg"
              className="element-1"
              alt="who-am-i"
            ></img>
          </Col>
        </Row>
        <Row className="align-items-center mb-3">
          <Col md={6} className="order-md-0 order-0">
            <img
              src="/Images/why-choose-me (2).jpg"
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
              src="/Images/proccess.jpg"
              className="element-1"
              alt="who-am-i"
            ></img>
          </Col>
        </Row>
        <Container className="mt-5">
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
        </Container>
      </Container>
    </div>
  );
}
