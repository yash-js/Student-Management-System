import React, { useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import {
  Card, CardImg, CardBody,
  CardTitle, Button,
  Container,

  Row,
  Col
} from "reactstrap";
import { useCookies } from "react-cookie";

function AdminDashboard() {
  const [cookies, removeCookie] = useCookies("user")
  const history = useHistory("");

  useEffect(() => {
    if (!cookies.user || cookies.user.role !== "admin") {
      return history.push("/admin");
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!cookies.user || cookies.user.role !== "admin") {
      return history.push("/admin");
    }
    // eslint-disable-next-line
  }, [cookies.user]);



  const logout = async () => {
    removeCookie("user", null, {
      path: "/admin",
      maxAge: "10",
    });
    return history.push("/admin");
  };


  return (
    <Container className="pb-1 " style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: "column", width: "100%", }} >
      <Row className="justify-content-center" >
        <Col sm='3' className="mt-5">

          <Card>
            <CardImg className="p-1" top style={{ width: '55%', margin: 'auto' }} src="https://res.cloudinary.com/ddetbymlt/image/upload/v1622454248/student-with-graduation-cap_d12k18.png" alt="Card image cap" />
            <CardBody>
              <CardTitle tag="h5" className="text-center">Students</CardTitle>
              <div className="px-4" style={{ width: '100%', display: "flex", alignItems: 'center', justifyContent: 'space-around' }}>

                <Link to="/admin/add/student" className="mr-2" > <Button size="small" color="primary">
                  Add
                </Button>
                </Link>

                <Link to="/admin/view/students">

                  <Button size="small" color="primary" >View</Button>
                </Link>

              </div>
            </CardBody>
          </Card>
        </Col>
        <Col sm="3" className="mt-5">

          <Card>
            <CardImg className="p-1" top style={{ width: '55%', margin: 'auto' }} src="https://res.cloudinary.com/ddetbymlt/image/upload/v1622455867/management_bhxsws.png" alt="Card image cap" />
            <CardBody>
              <CardTitle tag="h5" className="text-center">Admins</CardTitle>
              <div className="px-4" style={{ width: '100%', display: "flex", alignItems: 'center', justifyContent: 'space-around' }}>
                <Link className="mr-2" to="/admin/add">
                  <Button color="primary" >
                    Add
                  </Button>
                </Link>

                <Link to="/admin/view/admin">
                  <Button color="primary" >View</Button>
                </Link>


              </div>
            </CardBody>
          </Card>
        </Col>
        <Col sm="3" className="mt-5">

          <Card>
            <CardImg className="p-1" top style={{ width: '55%', margin: 'auto' }} src="https://res.cloudinary.com/ddetbymlt/image/upload/v1622456114/books-stack-of-three_mlyqee.png" alt="Card image cap" />
            <CardBody>
              <CardTitle tag="h5" className="text-center">Subjects</CardTitle>
              <div className="px-4" style={{ width: '100%', display: "flex", alignItems: 'center', justifyContent: 'space-around' }}>

                {/* <Link to="/admin/add/exam">
                  <Button color="primary" >Add</Button>
                </Link> */}

                <Link to="/admin/view/subjects">
                  <Button color="primary" >
                    View
                  </Button>
                </Link>

              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col sm="3" className="mt-5">

          <Card>
            <CardImg className="p-1" top style={{ width: '55%', margin: 'auto' }}
              src="https://res.cloudinary.com/ddetbymlt/image/upload/v1622456123/exam_1_whg2pc.png"
              alt="Card image cap" />
            <CardBody>
              <CardTitle tag="h5" className="text-center">Exam Schedule</CardTitle>
              <div className="px-4" style={{ width: '100%', display: "flex", alignItems: 'center', justifyContent: 'space-around' }}>

                <Link className="mr-2" to="/admin/add/exam">
                  <Button color="primary" >Add</Button>
                </Link>

                <Link to="/admin/view/exam/schedule">
                  <Button color="primary" >View</Button>
                </Link>


              </div>
            </CardBody>
          </Card>

        </Col>


        <Col sm="3" className="mt-5">

          <Card>
            <CardImg className="p-1" top style={{ width: '55%', margin: 'auto' }}
              src="https://res.cloudinary.com/ddetbymlt/image/upload/v1622456117/exam_we0xmc.png"
              alt="Card image cap" />
            <CardBody>
              <CardTitle tag="h5" className="text-center">Results</CardTitle>
              <div className="px-4" style={{ width: '100%', display: "flex", alignItems: 'center', justifyContent: 'space-around' }}>

                <Link className="mr-2" to="/admin/add/result">
                  <Button color="primary" >Add</Button>
                </Link>

                <Link to="/admin/view/result">
                  <Button color="primary" >View</Button>
                </Link>


              </div>
            </CardBody>
          </Card>
        </Col>
        <Col sm="3" className="mt-5">
          <Card>
            <CardImg className="p-1" top style={{ width: '55%', margin: 'auto' }} src="https://res.cloudinary.com/ddetbymlt/image/upload/v1622458011/logout_ldqb6c.png" alt="Card image cap" />
            <CardBody>
              <CardTitle tag="h5" className="text-center">Logout</CardTitle>
              <div className="px-4" style={{ width: '100%', display: "flex", alignItems: 'center', justifyContent: 'space-around' }}>


                <Button onClick={logout} color="primary" >Logout</Button>

              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

    </Container >
  );
}

export default AdminDashboard;
