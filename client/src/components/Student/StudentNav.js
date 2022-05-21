import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

function StudentNav() {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const history = useHistory("");
  const [cookies, removeCookie] = useCookies("user");
  const sem = cookies.user.semester;
  const en = cookies.user.enrollmentNumber;

  const logout = async () => {
    await removeCookie("user", null, {
      path: "/",
      maxAge: "10",
    });
    return history.push("/");
  };

  return (
    <div>
      <Navbar dark color="dark" light expand="md">
        <Link to="/home">
          <NavbarBrand>Student</NavbarBrand>
        </Link>

        <NavbarToggler onClick={toggle} />
        {/*  <Nav>
            <Nav className="mr-auto" navbar={true}>
              <NavItem>
                <Link to={`/result/${en}`}>
                  <NavLink>View Your Result</NavLink>
                </Link>
              </NavItem>

              <NavItem nav innavbar>
                <Link to={`/view/schedule/${sem}`}>
                  <NavLink>View Exam Schedule</NavLink>
                </Link>
              </NavItem>
            </Nav>
          </Nav> */}
        {history.location.pathname !== '/home' &&
          <Collapse isOpen={isOpen} navbar={true}>

            <Nav className="ml-auto">
              <NavItem navbar>
                <NavLink
                  onClick={logout}
                  className="text-light"
                  style={{ cursor: "pointer" }}
                >
                  Logout
                </NavLink>
              </NavItem>{" "}
            </Nav>       </Collapse>
            }

      </Navbar>
    </div>
  );
}

export default StudentNav;
