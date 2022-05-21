import React from "react";
import { Link, useHistory } from "react-router-dom";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
} from "reactstrap";

function ResultNav() {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const history = useHistory("");

  const login = () => history.push("/");
  return (
    <div>
      <Navbar dark color="dark" light expand="md">
        <Link to="/">
          <NavbarBrand>Student</NavbarBrand>
        </Link>

        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar={true}>
          <Nav>
            <NavLink
              onClick={login}
              className="text-light sd"
              style={{ cursor: "pointer", marginRight: "auto !important" }}
            >
              Login
            </NavLink>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default ResultNav;
