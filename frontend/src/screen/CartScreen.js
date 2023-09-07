import { useContext } from 'react';
import { Store } from '../Store';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import MessageBox from '../components/MessageBox';
import Container from 'react-bootstrap/esm/Container';
export default function CartScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const navigate = useNavigate();

  const updateCartHandler = (item, quantity) => {
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  const removeItemHandler = (item) => {
    ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  const checkoutHandler = () => {
    navigate('/signin?redirect=/shipping');
  };
  return (
    <Container>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1 className="text-center py-5 fs-4 titre text-uppercase">
        Revue des articles
      </h1>
      <Row style={{ paddingTop: '5%' }}>
        <Col md={8} className="mb-4">
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is empty <Link to="/">Go Shopping</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item className="py-5 my-1" key={item._id}>
                  <Row className="align-items-center ps-4">
                    <Col className="text-center mb-md-0 mb-sm-3" md={3}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail pb-1 border-0"
                      />
                      <Link
                        className="lien text-black fw-semibold"
                        to={`/products/${item.slug}`}
                        style={{ textDecoration: 'none' }}
                      >
                        {item.name}
                      </Link>
                    </Col>
                    <Col xs={2}>
                      <div className="row  align-items-center ">
                        <button
                          disabled={item.quantity === 1}
                          onClick={() =>
                            updateCartHandler(item, item.quantity - 1)
                          }
                          className="p-0 col-4"
                          style={{ width: 'fit-content' }}
                        >
                          <i class="fa-solid fa-circle-minus"></i>
                        </button>

                        <span className="col-4 p-0 text-center">
                          {item.quantity}
                        </span>

                        <button
                          disabled={item.quantity === 10}
                          onClick={() =>
                            updateCartHandler(item, item.quantity + 1)
                          }
                          className="p-0 col-4"
                          style={{ width: 'fit-content' }}
                        >
                          <i class="fa-solid fa-circle-plus"></i>
                        </button>
                      </div>
                    </Col>
                    <Col xs={3} className="text-center">
                      Taille: {item.taille}
                    </Col>
                    <Col md={2} xs={4} className="text-center">
                      {item.price}$
                    </Col>
                    <Col xs={2}>
                      <button className="p-0">
                        <i
                          className="fas fa-trash"
                          onClick={() => removeItemHandler(item)}
                        ></i>
                      </button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          {cartItems.length > 0 ? (
            <Card>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>
                      Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}
                      {'  '}
                      items) : <br></br>
                      {cartItems
                        .reduce((a, c) => a + c.price * c.quantity, 0)
                        .toFixed(2)}
                      $
                    </h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className="d-grid">
                      <button
                        type="button"
                        className="btn-black bg-black text-white"
                        variant="primary"
                        disabled={cartItems.length === 0}
                        onClick={checkoutHandler}
                      >
                        <p className="btn-submit pt-1 fs-4">Continuer</p>
                      </button>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          ) : (
            <span></span>
          )}
        </Col>
      </Row>
    </Container>
  );
}
