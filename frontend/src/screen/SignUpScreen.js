import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Store } from "../Store";
import { toast } from "react-toastify";
import { getError } from "../utils";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

export default function SignUpScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const { data } = await Axios.post("/api/users/signup", {
        name,
        email,
        password,
      });
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/");
    } catch (err) {
      toast.error(getError(err));
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
    <Container className="small-container text-white mt-1 py-5">
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <Row>
        <Col md={5} className="signin-image d-md-grid d-xs-none"></Col>
        <Col md={7} className="p-5">
          <Helmet>
            <title>Sign Up</title>
          </Helmet>
          <h1 className="pb-5 mt-2">Sign Up</h1>
          <Form onSubmit={submitHandler} className="pb-5">
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
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

            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
            <button
              type="submit"
              className="bg-dark w-100 pt-1 mb-4 text-white text-center"
            >
              <p className="btn-submit">Sign Up</p>
            </button>
            <div className="mb-3">
              Already have an account?{" "}
              <Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
