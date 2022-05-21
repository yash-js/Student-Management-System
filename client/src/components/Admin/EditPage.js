import React, { useState, useEffect } from "react";
import Moment from "react-moment";

import axios from "axios";
import {
  Alert,
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Spinner,
  Jumbotron,
} from "reactstrap";
import { useHistory, useParams, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import "react-datepicker/dist/react-datepicker.css";
import generateUsername from "generate-username-from-email";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectStudent, studentinfo } from "../../features/studentSlice";

function EditPage() {
  // const dispatch = useDispatch();
  const [newdepartment, setNewDepartment] = useState("");
  const [newname, setNewName] = useState("");
  const [newemail, setNewEmail] = useState("");

  const [newusername, setNewUsername] = useState("");
  const [newsemester, setNewSemester] = useState("");
  const [newyear, setNewYear] = useState("");
  const [newaddress, setNewAddress] = useState("");
  const [newdob, setNewDob] = useState("");
  const [newcontact, setNewContact] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [cookies] = useCookies("user");
  const history = useHistory("");
  const dispatch = useDispatch();
  const { id } = useParams("");
  const student = useSelector(selectStudent);

  const getStudent = async () => {
    await axios
      .get(`/student/view/student/${id}`)
      .then((res) => {
        return dispatch(
          studentinfo({
            name: res.data.name,
            email: res.data.email,
            username: res.data.username,
            dob: res.data.dob,
            year: res.data.year,
            semester: res.data.semester,
            department: res.data.department,
            contact: res.data.contact,
            address: res.data.address,
          })
        );
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (!cookies.user.role === "admin") {
      return history.push("/");
    } else {
      getStudent();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!cookies.user.role === "admin") {
      return history.push("/l");
    } else {
      getStudent();
    } // eslint-disable-next-line
  }, [studentinfo]);

  const updateName = async () => {
    try {
      const response = await axios({
        method: "put",
        url: `/student/edit/name/${id}`,
        data: {
          newname,
        },
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      setNewName("");
      if (response.data.error) {
        setError(response.data.error);
      }

      setMessage("Name Updated!");

      return getStudent();
      // history.push("/dashboard");    s
    } catch (err) {
      console.log(err);
    }
  };

  const updateEmail = async () => {
    const yes = window.confirm(
      "Your Username will also updated with email ID. Check your mail for more."
    );
    if (yes) {
      try {
        const response = await axios({
          method: "put",
          url: `/student/edit/email/${id}`,
          data: {
            newemail,
            newusername,
          },
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        });
        setNewEmail("");
        if (response.data.error) {
          setError(response.data.error);
        }

        setMessage("Email Updated!");

        return getStudent();
        // history.push("/dashboard");    s
      } catch (err) {
        console.log(err);
      }
    }
  };

  const updateDepartment = async () => {
    try {
      const response = await axios({
        method: "put",
        url: `/student/edit/department/${id}`,
        data: {
          newdepartment,
        },
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      setNewDepartment("");
      if (response.data.error) {
        setError(response.data.error);
      }

      setMessage("Department Updated!");

      return getStudent();
      // history.push("/dashboard");    s
    } catch (err) {
      console.log(err);
    }
  };
  const updateYear = async () => {
    try {
      const response = await axios({
        method: "put",
        url: `/student/edit/year/${id}`,
        data: {
          newyear: newyear !== "" || newyear !== null ? newyear : 1,
        },
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      setNewYear(1);
      if (response.data.error) {
        setError(response.data.error);
      }

      setMessage("Year Updated!");

      return getStudent();
      // history.push("/dashboard");    s
    } catch (err) {
      console.log(err);
    }
  };
  const updateSemester = async () => {
    try {
      const response = await axios({
        method: "put",
        url: `/student/edit/semester/${id}`,
        data: {
          newsemester,
        },
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      setNewSemester("");
      if (response.data.error) {
        setError(response.data.error);
      }

      setMessage("Semester Updated!");

      return getStudent();
    } catch (err) {
      console.log(err);
    }
  };
  const updateAddress = async () => {
    try {
      const response = await axios({
        method: "put",
        url: `/student/edit/address/${id}`,
        data: {
          newaddress,
        },
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      setNewAddress("");
      if (response.data.error) {
        setError(response.data.error);
      }

      setMessage("Address Updated!");

      return getStudent();
    } catch (err) {
      console.log(err);
    }
  };
  const updateDob = async () => {
    try {
      const response = await axios({
        method: "put",
        url: `/student/edit/dob/${id}`,
        data: {
          newdob,
        },
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      setNewDob("");
      if (response.data.error) {
        setError(response.data.error);
      }

      setMessage("Date of Birth Updated!");

      return getStudent();
    } catch (err) {
      console.log(err);
    }
  };
  const updateContact = async () => {
    try {
      const response = await axios({
        method: "put",
        url: `/student/edit/contact/${id}`,
        data: {
          newcontact,
        },
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      setNewDob("");
      if (response.data.error) {
        setError(response.data.error);
      }

      setMessage("Contact Number Updated!");

      return getStudent();
    } catch (err) {
      console.log(err);
    }
  };

  const [visible, setVisible] = useState(true);

  const onDismiss = () => setVisible(false);

  if (!student) {
    return (
      <div className="container text-center mt-5">
        <Jumbotron>
          <Spinner color="primary" />
        </Jumbotron>
      </div>
    );
  }

  return (
    <Form
      onSubmit={(e) => e.preventDefault()}
      className="mt-2 p-5"
      style={{ width: "90%", margin: "auto", background: " white" }}
    >
      {message && (
        <Alert color="success" isOpen={visible} toggle={onDismiss}>
          {message}
        </Alert>
      )}
      {error && (
        <Alert color="danger" isOpen={visible} toggle={onDismiss}>
          {error}
        </Alert>
      )}
      <Link to="/admin/dashboard">
        {"<"} {""} Go Back
      </Link>
      <h1 style={{ borderBottom: "1px solid gray" }} className="text-center">
        Edit Your Details
      </h1>
      <Row form>
        <Col className="mt-3" md={4}>
          <Label for="exampleEmail" className="font-weight-bold">
            Name :
          </Label>{" "}
          <p className="lead">{student.name}</p>
          <Input
            onChange={(e) => setNewName(e.target.value)}
            type="text"
            value={newname}
            placeholder="Enter Your Name"
          />
          <Button
            onClick={updateName}
            className="mt-2 float-right "
            color="primary"
            disabled={!newname}
          >
            Change Name
          </Button>
        </Col>
        <Col className="mt-3" md={4}>
          <Label for="exampleEmail" className="font-weight-bold">
            Email :
          </Label>
          <p className="lead">{student.email}</p>

          <Input
            onChange={(e) => {
              setNewEmail(e.target.value);
              setNewUsername(generateUsername(e.target.value));
            }}
            type="email"
            value={newemail}
            name="email"
          />
          <Button
            onClick={updateEmail}
            className="mt-2 float-right"
            color="primary"
            disabled={!newemail}
          >
            Change Email
          </Button>
        </Col>
        <Col className="mt-3" md={4}>
          <Label for="exampleNumber" className="font-weight-bold">
            Username :
          </Label>
          <p className="lead">{student.username}</p>
          <Input
            disabled
            type="text"
            name="number"
            placeholder="Username"
            value={newusername}
          />{" "}
          <Button
            size="small"
            disabled
            color="primary"
            className="mt-2 float-right"
          >
            Change Username
          </Button>
        </Col>
        <Col className="mt-3" md={4}>
          <Label for="exampleSelect" className="font-weight-bold">
            Department :
          </Label>
          <p className="lead">{student.department}</p>
          <Input
            type="select"
            name="select"
            value={newdepartment}
            onChange={(e) => setNewDepartment(e.target.value)}
          >
            <option value="BCA">BCA</option>
          </Input>
          <Button
            onClick={updateDepartment}
            color="primary"
            className="mt-2 float-right"
            disabled={!newdepartment}
          >
            Change Department
          </Button>
        </Col>
        <Col className="mt-3" md={4}>
          <Label for="exampleSelect" className="font-weight-bold">
            Year :
          </Label>
          <p className="lead">{student.year}</p>
          <Input
            type="select"
            defaultValue={1}
            value={student.year}
            onChange={(e) => {
              setNewYear(e.target.value);
            }}
            name="select"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </Input>
          <Button
            onClick={updateYear}
            color="primary"
            className="mt-2 float-right"
            disabled={!newyear}
          >
            Change Year
          </Button>
        </Col>
        <Col className="mt-3" md={4}>
          <Label for="exampleSelect" className="font-weight-bold">
            Semester :
          </Label>
          <p className="lead">{student.semester}</p>
          <Input
            value={student.semester}
            type="select"
            onChange={(e) => setNewSemester(e.target.value)}
            name="select"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </Input>
          <Button
            onClick={updateSemester}
            color="primary"
            className="mt-2 float-right"
            disabled={!newsemester}
          >
            Change Semester
          </Button>
        </Col>
      </Row>
      <FormGroup className="mt-4">
        <Label for="exampleAddress" className="font-weight-bold">
          Address :
        </Label>
        <p className="lead">{student.address}</p>
        <Input
          type="text"
          value={newaddress}
          name="address"
          onChange={(e) => setNewAddress(e.target.value)}
        />
        <Button
          onClick={updateAddress}
          color="primary"
          disabled={!newaddress}
          className="mt-2 float-right"
        >
          Change Address
        </Button>
      </FormGroup>
      <Row className="mt-5" form>
        <Col className="mt-3" md={6}>
          <Label for="exampleDate" className="font-weight-bold">
            Date of Birth :
          </Label>
          <p className="lead">
            {" "}
            <Moment className="lead" format="DD/MM/YYYY">
              {student.dob}
            </Moment>
          </p>

          <Input
            type="date"
            name="date"
            id="exampleDate"
            placeholder={student.dob}
            value={newdob}
            style={{ textTransform: "uppercase" }}
            onChange={(e) => setNewDob(e.target.value)}
          />
          <Button
            onClick={updateDob}
            color="primary"
            className="mt-2 float-right"
            disabled={!newdob}
          >
            Change Date
          </Button>
        </Col>
        <Col className="mt-3" md={6}>
          <Label for="exampleNumber" className="font-weight-bold">
            Number :
          </Label>
          <p className="lead">{student.contact}</p>
          <Input
            type="number"
            onChange={(e) => setNewContact(e.target.value)}
            name="number"
            maxLength="10"
            placeholder={student.contact}
          />
          <Button
            type="submit"
            onClick={updateContact}
            color="primary"
            disabled={!newcontact}
            className="mt-2 float-right"
          >
            Change Number
          </Button>
        </Col>{" "}
      </Row>
    </Form>
  );
}

export default EditPage;
