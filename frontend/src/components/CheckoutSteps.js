import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default function CheckoutSteps(props) {
  return (
    <Row className="checkout-steps">
      <Col
        className={props.step1 ? 'active border bg-dark text-white' : 'border'}
      >
        Sign-In
      </Col>
      <Col
        className={props.step2 ? 'active border bg-dark text-white' : 'border'}
      >
        Shipping
      </Col>
      <Col
        className={props.step3 ? 'active border bg-dark text-white' : 'border'}
      >
        Payment
      </Col>
      <Col
        className={props.step4 ? 'active border bg-dark text-white' : 'border'}
      >
        Order
      </Col>
    </Row>
  );
}
