import React, { useState, useEffect } from "react";

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
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";

import { useCookies } from "react-cookie";
import "react-datepicker/dist/react-datepicker.css";
import generateUsername from "generate-username-from-email";

function AddStudent() {
  const [department, setDepartment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [student, setStudent] = useState("");
  const [loading, setLoading] = useState(false)

  const [semester, setSemester] = useState("");
  const [year, setYear] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [enrollmentNumber, setEnrollmentNumber] = useState("");
  const [cookies] = useCookies("user");
  const history = useHistory("");

  const getStudents = () => {
    if (year === "1" || year === "2" || year === "3") {
      return axios
        .get(`/admin/view/students/${year}`)
        .then((res) => {
          setStudent(res.data);
        })
        .catch((err) => console.error(err));
    } else {
      return axios
        .get(`/admin/view/students`)
        .then((res) => {
          setStudent(res.data);
        })
        .catch((err) =>
          console.error(err)
        );
    }
  };
  useEffect(() => {
    if (cookies.user.role !== "admin") {
      return history.push("/");
    } else {
      getStudents("");
    }
    // eslint-disable-next-line
  }, []);

  const generateEnNumber = () => {
    var date = new Date();
    var year = date.getFullYear();
    var sem = 10 * semester;
    var len = student.length + 1;
    const generate = department + year + sem + len;
    setEnrollmentNumber(generate);
  };
console.log(student.length)
  const sem = () => {
    if (year === "1") {
      return (
        <Input
          type="select"
          onChange={(e) => {
            setSemester(e.target.value);
            generateEnNumber();
          }}
          name="select"
        >
          <option selected>
            Select
          </option>
          <option value="1">1</option>
          <option value="2">2</option>
        </Input>
      );
    } else if (year === "2") {
      return (
        <Input
          type="select"
          onChange={(e) => {
            setSemester(e.target.value);
            generateEnNumber();
          }}
          name="select"
        >
          <option defaultValue disabled selected>
            Select
          </option>

          <option value="3">3</option>
          <option value="4">4</option>
        </Input>
      );
    } else if (year === "3") {
      return (
        <Input
          type="select"
          onChange={(e) => {
            setSemester(e.target.value);
            generateEnNumber();
          }}
          name="select"
        >
          <option defaultValue disabled selected>
            Select
          </option>

          <option value="5">5</option>
          <option value="6">6</option>
        </Input>
      );
    } else {
      return (
        <Input type="select" name="select">
          <option defaultValue disabled selected>
            Select
          </option>
        </Input>
      );
    }
  };

  const add = async () => {
    setVisible(false);
    setLoading(true);
    try {
      const response = await axios({
        method: "post",
        url: `/admin/add/student`,
        data: {
          name,
          password,
          cPassword,
          email,
          dob,
          year,
          address,
          department,
          semester,
          contact,
          enrollmentNumber,
          username,
        },
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      setLoading(false)
      setAddress("");
      setName("");
      setError("")
      setEmail("");
      setPassword("");
      setDob("");
      setCPassword("");
      setSemester("");
      setDepartment("");
      setEnrollmentNumber("");
      setUsername("");
      setVisible(true)
      setYear("");
      setMessage("Student Added!");
      if (response.data.error) {

        return setError(response.data.error);
      }
    } catch (err) {
      setLoading(false)
      // setError(err.response.data.error); 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
      console.log(err.response.data.error);
      setVisible(true)
      setError(err.response.data.error);
      setAddress("");
      setName("");
      setEmail("");
      setPassword("");
      setDob("");
      setCPassword("");
      setSemester("");
      setDepartment("");
      setEnrollmentNumber("");
      setUsername("");
      setYear("");
      if (err && err.response.data.error) setError(err.response.data.error);
    }
  };
  const [visible, setVisible] = useState(true);

  const onDismiss = () => {
    setVisible(false);
    setError("");
  };
  return (
    <Form
      onSubmit={(e) => e.preventDefault()}
      className="mt-2 p-5"
      style={{ width: "80%", margin: "auto", background: " white" }}
    >
      <span>
        <Link to="/admin/dashboard">{'< '}Go Back</Link>
      </span>
      {loading && <Spinner color="primary" />}

      {message ? (
        <Alert color="success" isOpen={visible} toggle={onDismiss}>
          {message}
        </Alert>
      ) : ""}
      {error ?
        (
          <Alert color="danger" isOpen={visible} toggle={onDismiss} >
            {error}
          </Alert>
        )
        : ""}

      <h1 className="text-center">Enter Student Details</h1>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="exampleEmail">Name</Label>
            <Input
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter Name"
            />
          </FormGroup>
        </Col>

        <Col md={6}>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input
              onChange={(e) => {
                setEmail(e.target.value);
                setUsername(generateUsername(e.target.value));
              }}
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="Enter Email"
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              placeholder="Password"
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="examplePassword">Confirm Password</Label>
            <Input
              onChange={(e) => setCPassword(e.target.value)}
              type="password"
              name="password"
              placeholder="Confirm Password"
            />
          </FormGroup>
        </Col>

        <Col md={4}>
          <FormGroup>
            <Label for="exampleSelect">Select Department</Label>
            <Input
              type="select"
              name="select"
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option defaultValue selected disabled>
                Select
              </option>
              <option value="BCA">BCA</option>
            </Input>
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="exampleSelect">Select Year</Label>
            {department === "" && (
              <Input type="select" name="select">
                <option defaultValue disabled selected>
                  Select
                </option>
              </Input>
            )}
            {department === "BCA" && (
              <Input
                type="select"
                onChange={(e) => setYear(e.target.value)}
                name="select"
              >
                <option defaultValue disabled selected>
                  Select
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </Input>
            )}
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="exampleSelect">Semester</Label>
            {sem()}
          </FormGroup>
        </Col>
      </Row>
      <FormGroup>
        <Label for="exampleAddress">Address</Label>
        <Input
          type="text"
          name="address"
          onChange={(e) => setAddress(e.target.value)}
          id="exampleAddress"
          placeholder="Enter Address"
        />
      </FormGroup>

      <Row form>
        <Col md={3}>
          <FormGroup>
            <Label for="exampleEmail">Enrollment Number</Label>
            <Input
              disabled
              value={enrollmentNumber}
              type="text"
              placeholder="Enrollment Number"
            />
          </FormGroup>
        </Col>
        <Col md={3}>
          <FormGroup>
            <Label for="exampleDate">Date of Birth</Label>
            <Input
              type="date"
              name="date"
              id="exampleDate"
              placeholder="Date Of Birth"
              style={{ textTransform: "uppercase" }}
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </FormGroup>
        </Col>

        <Col md={3}>
          <FormGroup>
            <Label for="exampleNumber">Number</Label>
            <Input
              type="number"
              onChange={(e) => setContact(e.target.value)}
              name="number"
              maxLength="10"
              placeholder="Contact Number"
            />
          </FormGroup>
        </Col>
        <Col md={3}>
          <FormGroup>
            <Label for="exampleNumber">Username</Label>
            <Input
              disabled
              type="text"
              value={username}
              placeholder="Username"
            />
          </FormGroup>
        </Col>
      </Row>

      <Button onClick={add}>Add Student </Button>
    </Form >
  );
}

export default AddStudent;
