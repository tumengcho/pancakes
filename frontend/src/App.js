import logo from './logo.svg';
import './App.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeScreen from './screen/HomeScreen';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

function App() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <BrowserRouter>
      <div>
        <div className='annonce'>
          <Container className='text-center pt-2'>
          <h1 className='fs-6 d-inline'>Livraison gratuite partout au Canada. 🍁</h1>  <i class="fa-solid fa-truck-fast" style={{Color: 'ffffff'}}></i>
          
          </Container>
          </div>
        <header>
          <nav className="container-fluid position-relative">
            <Navbar>
              <Navbar.Brand>
                <img
                  src="/Images/athlima_logo.png"
                  alt="Athlima Plug"
                  className="img-logo"
                ></img>
              </Navbar.Brand>
              <div className="items-mobile position-absolute end-0">
                <>
                  <i
                    onClick={handleShow}
                    className="me-2"
                    variant=""
                    class="fa-solid fa-bars fa-2xl"
                    style={{ color: '#000000' }}
                  ></i>

                  <Offcanvas show={show} onHide={handleClose} placement="end">
                    <Offcanvas.Header closeButton>
                      <Offcanvas.Title className="d-flex position-relative w-100">
                        <h1>SIGN UP</h1>{' '}
                        <h1 className="position-absolute end-0">
                          <i
                            class="fa-solid fa-circle-user fa-lg"
                            style={{ color: '#000000' }}
                          ></i>
                        </h1>
                      </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body className="pt-5">
                      <div className="d-block mb-3 border border-2 border-dark border-top-0 border-end-0 border-start-0">
                        <h1 className="fw-normal">INFOS</h1>
                      </div>
                      <div className="d-block mb-3 border border-2 border-dark border-top-0 border-end-0 border-start-0">
                        <h1 className="fw-normal">PRODUIT</h1>
                      </div>
                      <div className="d-block">
                        <h1 className="fw-normal">CONTACT</h1>
                      </div>
                    </Offcanvas.Body>
                  </Offcanvas>
                </>
              </div>
              <div className="position-absolute end-0 items">
                <Navbar>
                  <Nav.Item className="mx-3">
                    <h5 >Infos</h5>
                  </Nav.Item>
                  <Nav.Item className="mx-3">
                    <h5>Produit</h5>
                  </Nav.Item>
                  <Nav.Item className="mx-3">
                    <h5 >Contact</h5>
                  </Nav.Item>
                  <Nav.Item className="mx-3">
                    <i
                      class="fa-solid fa-circle-user fa-2xl"
                      style={{ color: '#000000' }}
                    ></i>
                  </Nav.Item>
                </Navbar>
              </div>
            </Navbar>
          </nav>
        </header>
        <div className="px-4">
          <Routes>
            <Route path="/" element={<HomeScreen />}></Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
