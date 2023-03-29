// import logo from './logo.svg';
import React from "react";
/* import bootstrap to set changes */
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./App.css";
import MyNavbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages";
//import Manager from "./pages/admin2";
import AdminPage from "./pages/admin";
import Driver from "./pages/delivery";

const navItems = [
  {
    text: "Manager",
    link: "/admin",
  },
  {
    text: "Driver",
    link: "/delivery",
  },
  {
    text: "Home",
    link: "/",
  },
];

function App() {
  return (
    <Container fluid>
      <Router>
        <Row>
          <Col>
            <MyNavbar items={navItems} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/delivery" element={<Driver />} />
            </Routes>
          </Col>
        </Row>
      </Router>
    </Container>
  );
}

export default App;
