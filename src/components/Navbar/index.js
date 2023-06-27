import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function NavbarItem(props) {
  return <Nav.Link href={props.link}>{props.text}</Nav.Link>;
}

const MyNavbar = (props) => {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#home">Delivery-System</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {props.items.map((i) => (
              <NavbarItem key={i.text} link={i.link} text={i.text} />
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    // <Nav>
    //   <NavMenu>
    //     {props.items.map((i) => (
    //       <NavbarItem link={i.link} text={i.text} />
    //     ))}
    //   </NavMenu>
    // </Nav>
  );
};

export default MyNavbar;
