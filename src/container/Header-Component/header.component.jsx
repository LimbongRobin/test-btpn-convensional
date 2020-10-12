import React, { Fragment } from "react";
import { Navbar, Nav, NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import "./header.styles.scss";

const Header = () => {
  return (
    <Fragment>
      <Navbar className="main-header" expand="md">
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink>
              <Link className="header-link" to="/">
                Home
              </Link>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink>
              <Link className="header-link" to="/task">
                Create
              </Link>
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </Fragment>
  );
};

export default Header;
