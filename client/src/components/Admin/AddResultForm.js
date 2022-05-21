import React, { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

import {
  Alert,
  Input,
  Form,
  Button,
  Row,
  Col,
  FormGroup,
  Label,
  Spinner,
} from "reactstrap";

function AddResultForm() {
  const [visible, setVisible] = useState(true);
  const [visibleMsg, setVisibleMsg] = useState(true);
  const [loading, setLoading] = useState(false)

  const onDismiss = () => {
    if (message) {
      setMessage("");
      setVisible(false);
    }
    if (error) {
      setError("");
      setVisible(false);
    }
  };
  const { dept, sem } = useParams();
  const [enrollmentNumber, setEnrollmentNumber] = useState("");

  const [subjects, setSubjects] = useState([]);
  const [name, setName] = useState("");
  const [students, setStudents] = useState([]);
  const [subjectCode, setSubjectCode] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [year, setYear] = useState("");
  const [obtainedMarks, setObtainedMarks] = useState("");
  const [totalMarks, setTotalMarks] = useState("");
  const [cookies] = useCookies("user");
  const history = useHistory("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const getYear = () => {
    if (sem === "1" || sem === "2") {
      return setYear("1");
    } else if (sem === "3" || sem === "4") {
      return setYear("2");
    } else {
      return setYear("3");
    }
  };

  const getStudents = async () => {
    try {
      const res = await axios.get(`/admin/view/students/sem/${sem}`);
      setStudents(res.data);
    } catch (err) {
      return console.error(err);
    }
  };

  const getSubjects = async () => {
    try {
      const res = await axios.get(`/admin/view/subjects`);
      setSubjects(res.data);
      getYear();
      getStudents();
    } catch (err) {
      return console.error(err);
    }
  };

  const subSem = subjects.filter((sub) => sub.semester === sem);

  const getSubjectCode = () => {
    if (subjectName !== "") {
      const sub = subjects.filter((s) => s.name === subjectName);
      setSubjectCode(sub[0].code);
    } else {
      setSubjectCode("");
    }
  };

  useEffect(() => {
    if (!cookies.user || cookies.user.role !== "admin") {
      return history.push("/admin");
    }
    getSubjects();
    getStudents();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (!cookies.user || cookies.user.role !== "admin") {
      return history.push("/admin");
    }
    // eslint-disable-next-line
  }, [error]);

  const getEnNumber = () => {
    if (name !== "") {
      const studentName = students.filter((s) => s.name === name);

      setEnrollmentNumber(studentName[0].enrollmentNumber);
    } else {
      setEnrollmentNumber("");
    }
  };
  useEffect(() => {
    getEnNumber();
    // eslint-disable-next-line
  }, [name]);

  useEffect(() => {
    getSubjectCode();
    // eslint-disable-next-line
  }, [subjectName]);

  const add = async () => {
    setLoading(true)
    try {
      const response = await axios({
        method: "post",
        url: `/admin/add/result`,
        data: {
          name,
          semester: sem,
          department: dept,
          enrollmentNumber,
          subjectCode,
          subject: subjectName,
          obtainedMarks,
          totalMarks,
        },
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      setLoading(false)
      setName("");
      setSubjectCode("");
      setSubjectName("");
      setTotalMarks("");
      setObtainedMarks("");
      setEnrollmentNumber("");
      setVisibleMsg(true);
      setMessage("Marks Added!");
      if (response.data.error) {
        return (
          setError(response.data.error),
          setName(""),
          setSubjectCode(""),
          setSubjectName(""),
          setTotalMarks(""),
          setObtainedMarks(""),
          setEnrollmentNumber(""),
          setLoading(false)
        );
      }
    } catch (err) {
      setError(err.response.data.error);
      setVisible(true);
      setLoading(false)
      setName("");
      setSubjectCode("");
      setSubjectName("");
      setTotalMarks("");
      setObtainedMarks("");
      setEnrollmentNumber("");
    }
  };

  return (
    <Form
      onSubmit={(e) => e.preventDefault()}
      className="mt-2 p-5"
      style={{ width: "80%", margin: "auto", background: " white" }}
    >
      {message ? (
        <Alert color="success" isOpen={visibleMsg} toggle={onDismiss}>
          {message}
        </Alert>
      ) : (
        ""
      )}
      {loading && <Spinner color="primary" />}

      {error ? (
        <Alert
          color="danger"
          onClick={() => setError("")}
          isOpen={visible}
          toggle={onDismiss}
        >
          {error}
        </Alert>
      ) : (
        ""
      )}

      <h1 className="text-center">
        Add Marks for {dept} Sem {sem}
      </h1>

      <Row form>
        <Col md={6}>
          <FormGroup style={{ display: "grid" }}>
            <Label for="exampleEmail">Student Name:</Label>
            <Input
              value={name}
              required
              onChange={(e) => {
                setName(e.target.value);
                if (name) {
                  getEnNumber();
                }
              }}
              type="select"
            >
              <option value="">Select Student</option>
              {students.map((student) => (
                <option id={student._id} value={student.name}>
                  {student.name}
                </option>
              ))}
            </Input>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup style={{ display: "grid" }}>
            <Label for="exampleEmail">Enrollment Number:</Label>
            <Input
              disabled
              type="text"
              placeholder="Enrollment Number"
              value={enrollmentNumber}
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup style={{ display: "grid" }}>
            <Label for="exampleEmail"> Subject Name:</Label>
            <Input
              required
              value={subjectName}
              onChange={(e) => {
                setSubjectName(e.target.value);
                if (subjectName) {
                  getSubjectCode();
                }
              }}
              type="select"
            >
              <option value="">Select Subject</option>
              {subSem.map((sub) => (
                <option id={sub._id} value={sub.name}>
                  {sub.name}
                </option>
              ))}
            </Input>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup style={{ display: "grid" }}>
            <Label for="exampleEmail">Subject Code:</Label>
            <Input
              disabled
              placeholder="Subject Code"
              name="number"
              maxLength="10"
              value={subjectCode}
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup style={{ display: "grid" }}>
            <Label for="exampleEmail">Obtained Marks:</Label>
            <Input
              onChange={(e) => setObtainedMarks(e.target.value)}
              type="text"
              value={obtainedMarks}
              placeholder="Enter Obtained Marks"
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup style={{ display: "grid" }}>
            <Label for="exampleEmail">Total Marks:</Label>
            <Input
              value={totalMarks}
              placeholder="Enter Total Marks"
              onChange={(e) => setTotalMarks(e.target.value)}
              type="text"
            />
          </FormGroup>
        </Col>
      </Row>
      <Button color="primary" className="mr-3" onClick={add}>
        Add
      </Button>
      <span>
        <Link to="/admin/add/result">Go Back</Link>
      </span>
    </Form>
  );
}

export default AddResultForm;
