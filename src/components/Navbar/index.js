import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavMenu>
          <NavLink to="/admin" activeStyle>
            Manager
          </NavLink>
          <NavLink to="/delivery" activeStyle>
            Driver
          </NavLink>
          <NavLink to="/" activeStyle>
            Home
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;
