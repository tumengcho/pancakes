import React, { useContext, useReducer, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import axios from 'axios';
import Container from 'react-bootstrap/esm/Container';

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false };

    default:
      return state;
  }
};

export default function ProfileScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo, shippingAddress } = state;
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(userInfo.image || '');
  const [mobile, setMobile] = useState(userInfo.mobile);
  const [view, setView] = useState('profile');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
    loadingUpdate: false,
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        '/api/users/profile',
        {
          name,
          email,
          password,
          image,
          mobile,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.tokken}` },
        }
      );
      dispatch({
        type: 'UPDATE_SUCCESS',
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success('User updated successfully');
    } catch (err) {
      dispatch({
        type: 'FETCH_FAIL',
      });
      toast.error(getError(err));
    }
  };
  const imageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
    };
  };

  return (
    <Container className="mt-5">
      <>
        <link
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
          rel="stylesheet"
        />
        <div className="container bootstrap snippets bootdey">
          <div className="row bg-light align-items-center">
            <div className="profile-nav col-md-3">
              <div className="panel">
                <div className="user-heading round text-dark">
                  <a href="#">
                    <img
                      src={image !== '' ? image : '../Images/user.png'}
                      alt=""
                    />
                    {console.log(userInfo.image)}
                  </a>
                  <h1>{name}</h1>
                </div>
                <ul className="nav nav-pills nav-stacked d-flex flex-column">
                  <li className="">
                    <span
                      onClick={() => {
                        setView('profile');
                      }}
                    >
                      {' '}
                      <i className="fa fa-user" /> Profile
                    </span>
                  </li>
                  <li>
                    <span onClick={() => setView('activity')}>
                      {' '}
                      <i className="fa fa-calendar" /> Recent Activity{' '}
                      <span className="label label-warning pull-right r-activity"></span>
                    </span>
                  </li>
                  <li>
                    <span
                      onClick={() => {
                        setView('edit');
                      }}
                    >
                      {' '}
                      <i className="fa fa-edit" /> Edit profile
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            {view === 'profile' ? (
              <div className="profile-info mb-5 mt-md-0 mt-5 col-md-9">
                <Helmet>
                  <title>User Profile</title>
                </Helmet>
                <div className="panel">
                  <div className="panel-body bio-graph-info">
                    <h1 className="fw-bold text-black">User Profile</h1>
                    <div className="row">
                      <div className="bio-row">
                        <p>
                          <span>Full Name: </span> {name}
                        </p>
                      </div>

                      <div className="bio-row">
                        <p>
                          <span>Email: </span>
                          {email}
                        </p>
                      </div>
                      <div className="bio-row">
                        <p>
                          <span>Mobile: </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : view === 'edit' ? (
              <div className="container col-md-9 py-5 small-container">
                <Helmet>
                  <title>User Edit</title>
                </Helmet>
                <form onSubmit={submitHandler}>
                  <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Mobile</Form.Label>
                    <Form.Control
                      type="number"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Profile Image</Form.Label>
                    <Form.Control
                      type="file"
                      onChange={(e) => {
                        imageChange(e);
                      }}
                    />
                  </Form.Group>
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="bg-black w-100 pt-2 text-white"
                    >
                      <p className="btn-submit fs-5">Update</p>
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </>
    </Container>
  );
}
