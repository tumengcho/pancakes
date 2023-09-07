import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useReducer, useState } from 'react';
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
import '../product.css';
import { toast } from 'react-toastify';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'owl.carousel/dist/owl.carousel.min.js';

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
  const [image, setImage] = useState('');
  const [taille, setTaille] = useState('');
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const addToCartHandler = async () => {
    if (!taille && userInfo) {
      toast.error('Veuillez choisir une taille.');
    } else {
      const existItems = cart.cartItems.find((x) => x._id === product._id);
      const quantity = existItems ? existItems.quantity + 1 : 1;

      ctxDispatch({
        type: 'CART_ADD_ITEM',
        payload: { ...product, quantity, taille },
      });
      navigate('/cart');
    }
  };
  const buyNowHandler = async () => {
    if (!taille && userInfo) {
      toast.error('Veuillez choisir une taille.');
    } else {
      const existItems = cart.cartItems.find((x) => x._id === product._id);
      const quantity = 1;

      ctxDispatch({
        type: 'CART_ADD_ITEM',
        payload: { ...product, quantity, taille },
      });
      navigate('/shipping');
    }
  };

  console.log(image);
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
            src={image || product.image}
            className="img-fluid rounded img-thumbnail border-0"
          />

          {product.images.length === 0 ? (
            <OwlCarousel
              className=" owl-carousel  container-fluid"
              dots={false}
              center
              rewind={false}
              responsive={{
                0: { items: 3 },
              }}
            >
              {[product.image, ...product.images].map((x) => (
                <button
                  onClick={() => {
                    setImage(x);
                  }}
                >
                  <img src={x} key={x}></img>
                </button>
              ))}
            </OwlCarousel>
          ) : (
            <div className="mt-3">
              {product.images.length === 0 && <MessageBox>No image</MessageBox>}
              <div variant="flush" className="row">
                <OwlCarousel
                  className=" owl-carousel  container-fluid"
                  nav
                  dots={false}
                  navText={[
                    "<i class='fa fa-angle-left' style='background-color:white;'></i>",
                    "<i class='fa fa-angle-right' style='background-color:white;'></i>",
                  ]}
                  responsive={{
                    0: { items: 3 },
                  }}
                >
                  {[product.image, ...product.images].map((x) => (
                    <button
                      onClick={() => {
                        setImage(x);
                      }}
                    >
                      <img src={x} key={x}></img>
                    </button>
                  ))}
                </OwlCarousel>
              </div>
            </div>
          )}
        </Col>
        <Col md={6} className="px-5">
          <ListGroup variant="flush">
            <ListGroup.Item className="py-3 border-0">
              <Card.Title>
                <h1 className="">{product.name}</h1>{' '}
              </Card.Title>
            </ListGroup.Item>
            <ListGroup.Item className="border-0">
              <h3 className="fw-normal">{product.price} $</h3>
            </ListGroup.Item>
            <ListGroup.Item className="my-2">
              <p>select size:</p>
              {product.category === 'shoes' ? (
                <div className="size">
                  <input
                    name="7"
                    value="7"
                    style={{ caretColor: 'transparent' }}
                    className="btn btn-outline-dark"
                    onClick={(e) => setTaille(e.target.value)}
                    id="7"
                  ></input>
                  <input
                    name="8"
                    value="8"
                    style={{ caretColor: 'transparent' }}
                    className="btn btn-outline-dark"
                    onClick={(e) => setTaille(e.target.value)}
                    id="8"
                  ></input>
                  <input
                    name="9"
                    value="9"
                    style={{ caretColor: 'transparent' }}
                    className="btn btn-outline-dark"
                    onClick={(e) => setTaille(e.target.value)}
                    id="9"
                  ></input>
                  <input
                    name="10"
                    value="10"
                    style={{ caretColor: 'transparent' }}
                    className="btn btn-outline-dark"
                    onClick={(e) => setTaille(e.target.value)}
                    id="10"
                  ></input>
                  <input
                    name="11"
                    value="11"
                    style={{ caretColor: 'transparent' }}
                    className="btn btn-outline-dark"
                    onClick={(e) => setTaille(e.target.value)}
                    id="11"
                  ></input>
                  <input
                    name="12"
                    value="12"
                    style={{ caretColor: 'transparent' }}
                    className="btn btn-outline-dark"
                    onClick={(e) => setTaille(e.target.value)}
                    id="12"
                  ></input>
                  {console.log(taille)}
                </div>
              ) : (
                <div className="size">
                  <input
                    name="S"
                    value="S"
                    style={{ caretColor: 'transparent' }}
                    className="btn btn-outline-dark"
                    onClick={(e) => setTaille(e.target.value)}
                    id="S"
                  ></input>
                  <input
                    name="M"
                    value="M"
                    style={{ caretColor: 'transparent' }}
                    className="btn btn-outline-dark"
                    onClick={(e) => setTaille(e.target.value)}
                    id="M"
                  ></input>
                  <input
                    name="L"
                    value="L"
                    style={{ caretColor: 'transparent' }}
                    className="btn btn-outline-dark"
                    onClick={(e) => setTaille(e.target.value)}
                    id="L"
                  ></input>
                  <input
                    name="XL"
                    value="XL"
                    style={{ caretColor: 'transparent' }}
                    className="btn btn-outline-dark"
                    onClick={(e) => setTaille(e.target.value)}
                    id="XL"
                  ></input>

                  {console.log(taille)}
                </div>
              )}
            </ListGroup.Item>
            <ListGroup.Item className="py-4">
              <Row className="align-items-center text-center ">
                <Col>
                  <button
                    type="button"
                    className="w-100 pt-3 text-white btn bg-black"
                    onClick={addToCartHandler}
                  >
                    <p className="btn-submit  text-uppercase">Add to cart</p>
                  </button>
                </Col>
                <Col>
                  <button
                    type="button"
                    className="w-100 h-100 pt-3 btn btn-outline-dark "
                    onClick={buyNowHandler}
                  >
                    <p className="btn-submit text-uppercase">Buy Now</p>
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
