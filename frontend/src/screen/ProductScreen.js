import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useReducer } from 'react';
import logger from 'use-reducer-logger';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import MessageBox from '../components/MessageBox';
import { getError } from '../utils.js';
import { Store } from '../Store';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/esm/Button';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function ProductScreen() {
  const params = useParams();
  const { slug } = params;
  const navigate = useNavigate();

  const [{ loading, error, product }, dispatch] = useReducer(logger(reducer), {
    product: [],
    loading: true,
    error: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    fetchData();
  }, [slug]);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const addToCartHandler = async () => {
    const existItems = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItems ? existItems.quantity + 1 : 1;

    ctxDispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    navigate('/cart');
  };

  return loading ? (
    <div class="produit text-center">
      <Helmet>{product.name}</Helmet>
      <div class="intProduit container">
        <h1>Loading...</h1>
      </div>
    </div>
  ) : error ? (
    <div class="produit text-center">
      <div class="intProduit container">
        <MessageBox variant={'danger'}>{error}</MessageBox>
      </div>
    </div>
  ) : (
    <Container className="pt-md-5">
      <Helmet>{product.name}</Helmet>
      <Row className="align-items-center text-md-start text-center pt-5">
        <Col md={6}>
          <Card.Img
            variant="top"
            src={product.image + '.webp'}
            className="img-fluid rounded img-thumbnail border-0"
          />
        </Col>
        <Col md={6}>
          <ListGroup variant="flush">
            <ListGroup.Item className="py-3 border-0">
              <Card.Title>
                <h1 className="">{product.name}</h1>{' '}
              </Card.Title>
            </ListGroup.Item>
            <ListGroup.Item className="border-0">
              <h3 className="fw-normal">{product.price} $</h3>
            </ListGroup.Item>

            <ListGroup.Item className="py-4">
              <Row className="align-items-center text-center ">
                <Col>
                  <button
                    type="button"
                    className="w-100 pt-2 text-white bg-black"
                    onClick={addToCartHandler}
                  >
                    <p className="btn-submit text-uppercase">Add to cart</p>
                  </button>
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductScreen;
