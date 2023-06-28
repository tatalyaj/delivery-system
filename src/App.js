import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./App.css";
import MyNavbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages";
import AdminAddressesPage from "./pages/adminAddresses";
import AdminDriversPage from "./pages/adminDrivers";
import DeliveriesPage from "./pages/delivery";

class App extends React.Component {
  state = {
    data: null,
  };

  navItems = [
    {
      text: "Manager: Addresses",
      link: "/adminAddresses",
    },
    {
      text: "Manager: Drivers",
      link: "/adminDrivers",
    },
    {
      text: "Deliveries",
      link: "/delivery",
    },
    {
      text: "Home",
      link: "/",
    },
  ];

  render() {
    return (
      <Container fluid>
        <Router>
          <Row>
            <Col>
              <MyNavbar items={this.navItems} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route
                  path="/adminAddresses"
                  element={<AdminAddressesPage />}
                />
                <Route path="/adminDrivers" element={<AdminDriversPage />} />
                <Route path="/delivery" element={<DeliveriesPage />} />
              </Routes>
            </Col>
          </Row>
        </Router>
      </Container>
    );
  }
}
export default App;
