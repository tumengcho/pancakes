import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useReducer, useState } from "react";
import logger from "use-reducer-logger";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import MessageBox from "../components/MessageBox";
import { getError } from "../utils.js";
import { Store } from "../Store";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Badge from "react-bootstrap/esm/Badge.js";
import Col from "react-bootstrap/esm/Col";
import ListGroup from "react-bootstrap/ListGroup";
import "../product.css";
import { toast } from "react-toastify";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "owl.carousel/dist/owl.carousel.min.js";
import Recommendation from "../components/Recommendation";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAIL":
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
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };

    fetchData();
  }, [slug]);
  const [image, setImage] = useState("");
  const [slugP, setSlug] = useState("");
  const [taille, setTaille] = useState("");
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const addToCartHandler = async () => {
    if (!taille && userInfo) {
      toast.error("Veuillez choisir une taille.");
    } else {
      const existItems = cart.cartItems.find((x) => x._id === product._id);
      const quantity = existItems ? existItems.quantity + 1 : 1;

      ctxDispatch({
        type: "CART_ADD_ITEM",
        payload: { ...product, quantity, taille },
      });
      navigate("/cart");
    }
  };
  const buyNowHandler = async () => {
    if (!taille && userInfo) {
      toast.error("Veuillez choisir une taille.");
    } else {
      const existItems = cart.cartItems.find((x) => x._id === product._id);
      const quantity = 1;

      ctxDispatch({
        type: "CART_ADD_ITEM",
        payload: { ...product, quantity, taille },
      });
      navigate("/shipping");
    }
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
        <MessageBox variant={"danger"}>{error}</MessageBox>
      </div>
    </div>
  ) : (
    <Container className="pt-md-5">
      <Helmet>{product.name}</Helmet>
      <p className="text-white">
        {product.category} {">"} {product.description} {"> "}
        {product.name}
      </p>
      <Row className=" text-md-start border border-3 border-white rounded-2 bg-black text-center pt-5">
        <Col md={6} className="bg-black">
          {product.new ? <Badge pill>NEW</Badge> : ""}
          {product.promo ? (
            <Badge pill bg="danger">
              Promo
            </Badge>
          ) : (
            ""
          )}

          <Card.Img
            variant="top"
            src={image || product.image}
            className="img-fluid rounded bg-black img-thumbnail border-0"
          />
          {product.images.length === 0 ? (
            ""
          ) : (
            <div className="mt-3">
              <div variant="flush" className="row">
                <OwlCarousel
                  className=" owl-carousel  container-fluid"
                  nav
                  dots={false}
                  navText={[
                    "<i class='fa fa-angle-left' style='color:white;'></i>",
                    "<i class='fa fa-angle-right' style='color:white;'></i>",
                  ]}
                  responsive={{
                    0: { items: 3 },
                  }}
                  onLoad={() => {
                    slugP !== slug ? setImage("") : setImage(image);
                  }}
                >
                  {[product.image, ...product.images].map((x) => (
                    <button
                      onClick={() => {
                        setSlug(product.slug);
                        setImage(x);
                      }}
                    >
                      <img src={x} key={x}></img>
                      {console.log(slugP, slug)}
                    </button>
                  ))}
                </OwlCarousel>
              </div>
            </div>
          )}
        </Col>
        <Col md={6} className="bg-black row align-items-center pt-5 px-md-5">
          <ListGroup variant="flush h-100">
            <ListGroup.Item className="py-3 px-0 border-0 text-white bg-black">
              <Card.Title>
                <h1 className="">{product.name}</h1>{" "}
              </Card.Title>
            </ListGroup.Item>
            <ListGroup.Item className="border-0 text-white bg-black">
              <h3 className="fw-normal">{product.price} $</h3>
            </ListGroup.Item>
            <ListGroup.Item className="my-2 text-white bg-black">
              <p>select size:</p>
              {product.category === "shoes" ? (
                <div className="size">
                  <input
                    name="7"
                    value="7"
                    className="btn btn-outline-light border border-light"
                    onClick={(e) => setTaille(e.target.value)}
                    id="7"
                    readOnly
                  ></input>
                  <input
                    name="8"
                    value="8"
                    className="btn btn-outline-light border border-light"
                    onClick={(e) => setTaille(e.target.value)}
                    id="8"
                    readOnly
                  ></input>
                  <input
                    name="9"
                    value="9"
                    className="btn btn-outline-light border border-light"
                    onClick={(e) => setTaille(e.target.value)}
                    id="9"
                    readOnly
                  ></input>
                  <input
                    name="10"
                    value="10"
                    className="btn btn-outline-light border border-light"
                    onClick={(e) => setTaille(e.target.value)}
                    id="10"
                    readOnly
                  ></input>
                  <input
                    name="11"
                    value="11"
                    className="btn btn-outline-light border border-light"
                    onClick={(e) => setTaille(e.target.value)}
                    id="11"
                    readOnly
                  ></input>
                  <input
                    name="12"
                    value="12"
                    className="btn btn-outline-light border border-light"
                    onClick={(e) => setTaille(e.target.value)}
                    id="12"
                    readOnly
                  ></input>
                  {console.log(taille)}
                </div>
              ) : (
                <div className="size">
                  <input
                    name="S"
                    value="S"
                    className="btn btn-outline-light border border-light"
                    onClick={(e) => setTaille(e.target.value)}
                    id="S"
                    readOnly
                  ></input>
                  <input
                    name="M"
                    value="M"
                    className="btn btn-outline-light border border-light"
                    onClick={(e) => setTaille(e.target.value)}
                    id="M"
                    readOnly
                  ></input>
                  <input
                    name="L"
                    value="L"
                    className="btn btn-outline-light border border-light"
                    onClick={(e) => setTaille(e.target.value)}
                    id="L"
                    readOnly
                  ></input>
                  <input
                    name="XL"
                    value="XL"
                    className="btn btn-outline-light border border-light"
                    onClick={(e) => setTaille(e.target.value)}
                    id="XL"
                    readOnly
                  ></input>

                  {console.log(taille)}
                </div>
              )}
            </ListGroup.Item>
            <ListGroup.Item className="py-4 text-white bg-black">
              <Row className="align-items-center text-center ">
                <Col md={6}>
                  <button
                    type="button"
                    className="w-100 pt-3 text-white btn bg-white "
                    onClick={addToCartHandler}
                  >
                    <p className="btn-submit text-black text-uppercase">
                      Add cart
                    </p>
                  </button>
                </Col>
                <Col md={6} className="mt-3 mt-md-0">
                  <button
                    type="button"
                    className="w-100 h-100  pt-3 btn btn-outline-light border border-light "
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
      <Recommendation description={product.description} id={product._id} />
    </Container>
  );
}

export default ProductScreen;
