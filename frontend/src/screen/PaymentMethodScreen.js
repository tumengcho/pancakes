import React, { useContext, useEffect, useState } from 'react';
import CheckoutSteps from '../components/CheckoutSteps';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Store } from '../Store';
import { useNavigate } from 'react-router-dom';

export default function PaymentMethodScreen() {
  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(Store);

  const {
    cart: { shippingAddress, paymentMethod },
  } = state;

  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || 'Paypal'
  );

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: 'SAVE_PAYMENT_METHOD',
      payload: paymentMethodName,
    });
    localStorage.setItem('paymentMethod', paymentMethodName);
    navigate('/placeorder');
  };

  return (
    <div className="container pt-5">
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="container" style={{ maxWidth: '600px' }}>
        <Helmet>
          <title> Payment Method</title>
        </Helmet>
        <h1 className="my-3">Payment Method</h1>
        <div className="mb-3">
          <Form onSubmit={submitHandler}>
            <Form.Check
              type="radio"
              id="PayPal"
              label="Paypal"
              value="PayPal"
              checked={paymentMethodName === 'PayPal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </Form>
        </div>
        <div className="mb-3">
          <Form onSubmit={submitHandler}>
            <Form.Check
              type="radio"
              id="Stripe"
              label="Stripe"
              value="Stripe"
              checked={paymentMethodName === 'Stripe'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <div className="mb-3">
              <Button type="submit">Continue</Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
