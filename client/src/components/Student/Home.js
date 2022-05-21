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

function Home() {
    const [cookies, removeCookie] = useCookies("user")
    const history = useHistory("");
    const sem = cookies.user.semester;
    const en = cookies.user.enrollmentNumber;

    useEffect(() => {
        if (!cookies.user || cookies.user.role !== "student") {
            return history.push("/l");
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (!cookies.user || cookies.user.role !== "student") {
            return history.push("/");
        }
        // eslint-disable-next-line
    }, [cookies.user]);



    const logout = async () => {
        await removeCookie("user", null, {
            path: "/",
            maxAge: "10",
        });
        return history.push("/");
    };


    return (
        <Container className="pb-1 " style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: "column", width: "100%", }} >
            <Row className="justify-content-center" >
                <Col sm="3" className="mt-5">

                    <Card>
                        <CardImg className="p-1" top style={{ width: '50%', margin: 'auto' }} src="https://res.cloudinary.com/ddetbymlt/image/upload/v1622478422/information-button_yhjmco.png" alt="Card image cap" />
                        <CardBody>
                            <CardTitle tag="h5" className="text-center">Your Info</CardTitle>
                            <div className="px-4" style={{ width: '100%', display: "flex", alignItems: 'center', justifyContent: 'space-around' }}>

                                <Link to="/info">

                                    <Button size="small" color="primary" >View</Button>
                                </Link>

                            </div>
                        </CardBody>
                    </Card>
                </Col>

                <Col sm="3" className="mt-5">

                    <Card>
                        <CardImg className="p-1" top style={{ width: '50%', margin: 'auto' }} src="https://res.cloudinary.com/ddetbymlt/image/upload/v1622478585/schedule_ur0uh8.png" alt="Card image cap" />
                        <CardBody>
                            <CardTitle tag="h5" className="text-center">Exam Schedule</CardTitle>
                            <div className="px-4" style={{ width: '100%', display: "flex", alignItems: 'center', justifyContent: 'space-around' }}>

                                {/* <Link to="/admin/add/exam">
                  <Button color="primary" >Add</Button>
                </Link> */}

                                <Link to={`/view/schedule/${sem}`}>
                                    <Button color="primary" >
                                        View
                                    </Button>
                                </Link>

                            </div>
                        </CardBody>
                    </Card>
                </Col>



                <Col sm="3" className="mt-5">

                    <Card>
                        <CardImg className="p-1" top style={{ width: '50%', margin: 'auto' }}
                            src="https://res.cloudinary.com/ddetbymlt/image/upload/v1622456117/exam_we0xmc.png"
                            alt="Card image cap" />
                        <CardBody>
                            <CardTitle tag="h5" className="text-center">Result</CardTitle>
                            <div className="px-4" style={{ width: '100%', display: "flex", alignItems: 'center', justifyContent: 'space-around' }}>



                                <Link to={`/result/${en}`}>
                                    <Button color="primary" >View</Button>
                                </Link>


                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col sm="3" className="mt-5">
                    <Card>
                        <CardImg className="p-1" top style={{ width: '50%', margin: 'auto' }} src="https://res.cloudinary.com/ddetbymlt/image/upload/v1622478926/mail_mg5sj8.png" alt="Card image cap" />
                        <CardBody>
                            <CardTitle tag="h5" className="text-center">Contact  Admin</CardTitle>
                            <div className="px-4" style={{ width: '100%', display: "flex", alignItems: 'center', justifyContent: 'space-around' }}>

                            <Link to="/contact">
                                <Button  color="primary" >Contact</Button>
</Link>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col sm="3" className="mt-5">
                    <Card>
                        <CardImg className="p-1" top style={{ width: '50%', margin: 'auto' }} src="https://res.cloudinary.com/ddetbymlt/image/upload/v1622458011/logout_ldqb6c.png" alt="Card image cap" />
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

export default Home;
