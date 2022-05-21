import React, { useState, useEffect } from "react";
import "rc-time-picker/assets/index.css";
import moment from "moment";

import TimePicker from "rc-time-picker";

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
import { Link, useParams, useHistory } from "react-router-dom";

import { useCookies } from "react-cookie";
import "react-datepicker/dist/react-datepicker.css";

function AddExam() {
  const [subjects, setSubjects] = useState([]);
  const { sem, department } = useParams("");
  const [subjectName, setSubjectName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [year, setYear] = useState("");
  const [hrs, setHrs] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const history = useHistory("");
  const format = "hh:mm a";

  const now = moment().hour(0).minute(0);
  // const [cPassword, setCPassword] = useState("");
  const [loading, setLoading] = useState(false)

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [cookies] = useCookies("user");
  // const history = useHistory("");
  const getSubjects = async () => {

    await axios
      .get(`/admin/view/subjects`)
      .then((res) => {
        setSubjects(res.data);
        return subjects.filter((sub) => sub.semester === sem);
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    if (cookies.user && cookies.user.role !== "admin") {
      history.push("/");
    } else {
      getSubjects();
    }
    // eslint-disable-next-line
  }, []);

  function onChange(value) {
    setTime(value && value.format(format));
  }

  const getCode = () => {
    const findCode = subjects.filter((sub) => sub.name === subjectName);
    setSubjectCode(findCode[0].code);
  };


  const add = async () => {
    setLoading(true)
    if (sem === "1" || sem === "2") {
      setYear("1");
    } else if (sem === "3" || sem === "4") {
      setYear("2");
    } else {
      setYear("3");
    }

    try {
      await getCode();

      const response = await axios({
        method: "post",
        url: `/admin/exam/schedule`,
        data: {
          subjectName,
          date,
          time,
          sem,
          department,
          year,
          hrs,
          subjectCode,
        },
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      setLoading(false)
      setDate("");
      setHrs("");
      setSubjectCode("");
      setSubjectName("");
      setTime("");


      if (response.data.message) {

        return setMessage(response.data.message);
      }

      if (response.data.error) {
        return setError(response.data.error);
      }
    } catch (err) {
      //   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
      setLoading(false)
      setError(err.response.data.error);
    }
  };
  const [visible, setVisible] = useState(true);

  const onDismiss = () => setVisible(false);
  return (
    <Form
      onSubmit={(e) => e.preventDefault()}
      className="mt-2 p-5"
      style={{ width: "80%", margin: "auto", background: " white" }}
    >
      {" "}
      { }
      {loading && <Spinner color="primary" />}

      {message ? (
        <Alert color="success" isOpen={visible} toggle={onDismiss}>
          {message}
        </Alert>
      ) : (
        ""
      )}
      {error ? (
        <Alert color="danger" isOpen={visible} toggle={onDismiss}>
          {error}
        </Alert>
      ) : (
        ""
      )}
      <h1 className="text-center">
        {error} Add New Exam Schedule for {department} Sem {sem}
      </h1>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="exampleEmail">Subject Name</Label>
            <Input
              type="select"
              onChange={(e) => {
                setSubjectName(e.target.value);
                getCode();
              }}
              value={subjectName}
              required
            >
              <option>Choose Subject</option>{" "}
              {subjects
                .filter((sub) => sub.semester === sem)
                .map((subs) => {
                  return (
                    <>
                      <option key={subs._id} value={subs.name}>
                        {subs.name} (Sem- {subs.semester})
                      </option>
                    </>
                  );
                })}
            </Input>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="exampleEmail">Exam Date:</Label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{ textTransform: "uppercase" }}
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup style={{ display: "grid" }}>
            <Label for="exampleEmail">Exam Time:</Label>
            <TimePicker
              showSecond={false}
              defaultValue={now}
              className="xxx"
              onChange={onChange}
              format={format}
              use12Hours
              inputReadOnly
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup style={{ display: "grid" }}>
            <Label for="exampleEmail">Hours:</Label>
            <Input
              required
              onChange={(e) => setHrs(e.target.value)}
              type="select"
            >
              <option value="2 Hrs">2 Hrs</option>
              <option value="3 Hrs">3 Hrs</option>
            </Input>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label>Semester: </Label>
            <h4>
              <Input
                className="text-bolder font-weight-bolder "
                style={{
                  border: "1px solid #ced4da",
                  padding: ".375rem .75rem",
                  color: " #495057",
                  borderRadius: ".25rem",
                }}
                disabled
                value={sem}
              />
            </h4>
          </FormGroup>
        </Col>
      </Row>
      <Button type="submit" color="primary" className="mr-3" onClick={add}>
        Add
      </Button>
      <span>
        <Link to="/admin/add/exam">Go Back</Link>
      </span>
    </Form>
  );
}

export default AddExam;
