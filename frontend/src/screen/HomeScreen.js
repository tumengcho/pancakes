import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
          <Col md={6} className="order-md-0 order-1">
            <h1 className="mb-4 px-5">Who am I?</h1>
            <p className="px-5">
              I am a decent/efficient Video Editor with over 2.5+ (2020-now)
              years of experience in video editing , but mostly been inspired
              early on in video editing.
            </p>
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
          <Col md={6} className="order-md-0 order-1 px-5">
            <h1 className="mb-4 px-5">Why choose me?</h1>
            <p className="px-5">
              I am simple, friendly and professional. If there is any issue i
              deliver quick responses and I will always deliver on time.
            </p>
          </Col>
        </Row>
        <Row className="align-items-center mt-5">
          <Col md={6} className="order-md-0 order-1">
            <h1 className="mb-4 px-5">How does the proccess work?</h1>
            <p className="px-5">
              <strong>Step 1:</strong> Send your pre-cut videos. <br />
              <br />
              <strong>Step 2:</strong> Logo (optional).
              <br />
              <br />
              <strong>Step 3:</strong> Send Example of the style you want of the
              project (optional).
            </p>
          </Col>
          <Col md={6} className="order-md-1 order-0">
            <img
              src="/Images/proccess.jpg"
              className="element-1"
              alt="who-am-i"
            ></img>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
