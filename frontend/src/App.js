import logo from './logo.svg';
import './App.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeScreen from './screen/HomeScreen';

function App() {
  return (
    <BrowserRouter>
      <div>
        <header>
          <nav className="container-fluid position-relative">
            <Navbar>
              <Navbar.Brand>
                <img
                  src="/Images/pancake.png"
                  alt="pancake"
                  className="img-logo"
                ></img>
              </Navbar.Brand>
              <div className="position-absolute end-0">
                <Navbar>
                  <Nav.Item className="mx-3">
                    <h5>About</h5>
                  </Nav.Item>
                  <Nav.Item className="mx-3">
                    <h5>Pricing</h5>
                  </Nav.Item>
                  <Nav.Item className="mx-3">
                    <h5>Contact</h5>
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
