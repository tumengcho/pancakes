import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Store } from "../Store";
import { toast } from "react-toastify";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

export default function SignInScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post("/api/users/signin", {
        email,
        password,
      });
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/");
    } catch (err) {
      toast.error("Invalid email or password");
    }
  };

  useEffect(
    () => {
      if (userInfo) {
        navigate(redirect);
      }
    },
    navigate,
    redirect,
    userInfo
  );

  return (
    <Container className="small-container text-white my-5 py-5">
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <Row>
        <Col md={5} className="signin-image d-md-grid d-xs-none"></Col>
        <Col md={7} className="p-5">
          <h1 className="py-5 mt-5">Sign In</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>

              <Form.Control
                type="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <div className="bg-dark text-center pt-2 mb-4 text-white">
              <button type="submit">
                <p className="btn-submit">Sign In</p>
              </button>
            </div>
            <div className="mb-3">
              New Customer?{" "}
              <Link to={`/signup?redirect=${redirect}`}>
                Create your acount
              </Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
