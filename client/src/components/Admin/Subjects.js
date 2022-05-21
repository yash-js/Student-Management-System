import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { useCookies } from "react-cookie";

import {
  Alert,
  Input,
  Container,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Label,
  Spinner,
} from "reactstrap";
import axios from "axios";
import { Delete } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";

function Subjects() {

  const [name, setName] = useState("");
  const [semester, setSemester] = useState("");
  const [year, setYear] = useState("");
  const [department, setDepartment] = useState("");
  const [subject, setSubject] = useState(Array);
  const [cookies] = useCookies("user");
  const history = useHistory("");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false)
  const toggle = () => setModal(!modal);

  const getSubjects = async () => {
    setLoading(true)
    try {
      const res = await axios
        .get(`/admin/view/subjects`);
      setLoading(false)
      setSubject(res.data);
    } catch (err) {
      setLoading(false)
      return console.error(err);
    }
  };

  const add = async () => {
    setLoading(true)
    toggle();
    try {
      const response = await axios({
        method: "post",
        url: `/admin/add/subject`,
        data: {
          name,
          year,
          semester,
          department,
          code,
        },
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });

      setMsg("Subject  Added!");
      setName("");
      setYear("");
      setSemester("");
      setDepartment("");
      setCode("");
      setLoading(false)
      if (response.data.error) {
        setError(response.data.error);
      }
    } catch (err) {
      setLoading(false)
      setError(err.response.data.error);
      console.log(err.response.data.error);
    }
  };

  const deleteSubject = (id) => {
    window.confirm("Are you Sure ?");
    if (window.confirm) {
      setLoading(true)
      axios
        .delete(`/admin/delete/subject/${id}`)
        .then((res) => {
          setLoading(false)
          setMsg(res.data.message)
        }
        )
        .catch((err) => {
          setLoading(false)
          console.error(err)
        });
    }
  };

  useEffect(() => {
    if (!cookies.user || cookies.user.role !== "admin") {
      return history.push("/admin");
    } else {
      getSubjects();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!cookies.user || cookies.user.role !== "admin") {
      return history.push("/admin");
    } else {
      getSubjects();
    }
    // eslint-disable-next-line
  }, [subject.length]);

  const [visible, setVisible] = useState(true);
  const [code, setCode] = useState("");
  const generateCode = () => {
    const filteredSubjects = subject.filter((sub) => sub.semester === semester);

    return setCode(semester * 100 + filteredSubjects.length + 1);
  };

  const onDismiss = () => setVisible(false);
  return (
    <Container fluid
      style={{ backgroundColor: "white" }}
      className="p-2 mt-2 wid ">
      <span>
        <Link to="/admin/dashboard">{'< '}Go Back</Link>
      </span>
      <h1 className="display-4 text-center"> Subjects</h1>
      <Input
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
        type="search"
      />{" "}
      <div>
        {" "}
        <div className="p-2 mt-2 mb-2 ">
          {msg && (
            <Alert color="info" isOpen={visible} toggle={onDismiss}>
              {msg}
            </Alert>
          )}
          {error && (
            <Alert color="info" isOpen={visible} toggle={onDismiss}>
              {error}
            </Alert>
          )}
        </div>
        <Button
          color="primary"
          className="mt-2 mb-4 float-right"
          size="small"
          onClick={toggle}
        >
          Add New Subject
        </Button>
      </div>
      {/* MODAL */}

      <div>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Add New Subject</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label>Choose Subject's Semester:</Label>
              <Input
                type="select"
                onChange={(e) => setSemester(e.target.value)}
                value={semester}
                required
              >
                <option>Select</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </Input>
            </FormGroup>{" "}
            <FormGroup>
              <Label>Subject Name:</Label>
              <Input
                type="text"
                value={name}
                required
                placeholder="Enter Subject Name"
                onChange={(e) => {
                  setName(e.target.value);
                  generateCode();
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label>Subject Code:</Label>
              <Input disabled type="type" value={code} required />
            </FormGroup>
            <FormGroup>
              <Label>Choose Subject's Year:</Label>
              <Input
                type="select"
                onChange={(e) => setYear(e.target.value)}
                value={year}
                required
              >
                <option selected>Select</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label>Subject Department:</Label>
              <Input
                type="select"
                onChange={(e) => setDepartment(e.target.value)}
                value={department}
                required
              >
                <option selected>Select</option>
                <option value="BCA">BCA</option>
              </Input>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            {!name || !year || !department || !semester ? (
              <Button disabled color="primary" type="button" onClick={add}>
                Add Subject
              </Button>
            ) : (
              <Button color="primary" type="button" onClick={add}>
                Add Subject
              </Button>
            )}{" "}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
      {loading ? <div className="container text-center mt-5 pb-2" >

        <Spinner color="primary" />
      </div> : subject.length < 1 ? (
        <Container className="mt-5 p-2">
          <Alert className="mt-2 text-center" color="light">
            No Data to Show
          </Alert>
        </Container>
      ) : (
        <>
          <Table
            className="table-responsive-md"
            striped
          >
            <thead>
              <tr className="text-center">
                <th>Subject Code</th>
                <th>SubjectName</th>
                <th>Semester</th>
                <th>Year</th>
                <th>Department</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {subject
                .filter((val) => {
                  if (search === "") {
                    return val;
                  }

                  if (val.name.toLowerCase().includes(search.toLowerCase())) {
                    return val;
                  }
                  return val;
                })
                .map((subject) => {
                  return (
                    <tr key={subject._id} className="text-center">
                      <th scope="row">{subject.code}</th>
                      <td>{subject.name}</td>
                      <td>{subject.semester}</td>
                      <td>{subject.year}</td>
                      <td>{subject.department}</td>

                      <td
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <IconButton
                          titleaccess="Delete"
                          style={{ padding: "0px !important" }}
                        >
                          <Delete onClick={() => deleteSubject(subject._id)} />
                        </IconButton>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </>
      )}
    </Container>
  );
}

export default Subjects;
