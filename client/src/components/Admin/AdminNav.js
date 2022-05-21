import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavItem,
  NavLink,
  Nav,

} from "reactstrap";

function AdminNav() {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const history = useHistory("");

  const [cookies, removeCookie] = useCookies("user");
  const logout = async () => {
    await removeCookie("user", null, {
      path: "/admin",
      maxAge: "10",
    });
    return history.push("/");
  };

  return (
    <div>
      <Navbar dark color="dark" light expand="md">
        <Link className='navbar-brand' to="/admin/dashboard">
          Admin
        </Link>
        {/* <NavbarToggler onClick={toggle} /> */}
        {/* <Collapse isOpen={isOpen} navbar={true}>
          <Nav className="mr-auto" navbar={true}>

          </Nav>{" "} */}
        {/* {cookies.user && (
            <Nav>
              <NavItem navbar>
                <NavLink
                  onClick={logout}
                  className="text-light"
                  style={{ cursor: "pointer" }}
                >
                  Logout
                </NavLink>
              </NavItem>
            </Nav>
          )} */}
        {/* </Collapse> */}
      </Navbar>
    </div>
  );
}

export default AdminNav;
