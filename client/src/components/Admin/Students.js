import React, { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import Moment from "react-moment";
import {
  Alert,
  Input,
  Container,
  Table,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ButtonDropdown,
  Spinner,
} from "reactstrap";
import axios from "axios";
import { Delete } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
function Students() {
  const { year } = useParams("");

  const [student, setStudent] = useState([]);
  const [cookies] = useCookies("user");
  const history = useHistory("");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [dropdownOpen, setOpen] = useState(false);
  const toggle = () => setOpen(!dropdownOpen);
  const dept = useParams("dept").dept;
  const [visible, setVisible] = useState(true);

  const onDismiss = () => setVisible(false);
  const [loading, setLoading] = useState(false)
  const getStudents = async () => {
    setLoading(true)
    if (year === "1" || year === "2" || year === "3") {
      try {
        const res = await axios
          .get(`/admin/view/students/${year}`);
        setLoading(false)
        setStudent(res.data);
        console.log(res.data)
      } catch (err) {
        setLoading(false)
        return console.error(err);
      }
    } else if (dept) {
      try {
        const res_1 = await axios
          .get(`/admin/view/students/all/${dept.toUpperCase()}`);
        setLoading(false)
        setStudent(res_1.data);
      } catch (err_1) {
        setLoading(false)
        return setError(err_1.message);
      }
    } else {
      try {

        const res_2 = await axios
          .get(`/admin/view/students`);
        setLoading(false)
        setStudent(res_2.data);
      } catch (err_2) {
        setLoading(false)
        return console.error(err_2);
      }
    }
  };

  const deleteStudent = (id) => {
    window.confirm("Are you Sure ?");

    if (window.confirm) {
      setLoading(true)
      axios
        .delete(
          `/admin/delete/student/${id}`
        )
        .then((res) => {
          setLoading(false)
          setMsg(res.data)
        })
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
      getStudents();
    }
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (!cookies.user || cookies.user.role !== "admin") {
      return history.push("/admin");
    } else {
      getStudents();
    }
    // eslint-disable-next-line
  }, [visible]);
  useEffect(() => {
    if (!cookies.user || cookies.user.role !== "admin") {
      return history.push("/admin");
    } else {
      getStudents();
    }
    // eslint-disable-next-line
  }, [year]);
  useEffect(() => {
    if (!cookies.user || cookies.user.role !== "admin") {
      return history.push("/admin");
    } else {
      getStudents();
    }
    // eslint-disable-next-line
  }, [search]);
  

  return (
    <Container
      fluid
      style={{ backgroundColor: "white" }}
      className="p-2 mt-2 wid "
    >
      <span>
        <Link to="/admin/dashboard">{'< '}Go Back</Link>
      </span>
      <h1 className="display-4 text-center"> Students</h1>
      <Input
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
        type="search"
      />
      <ButtonDropdown
        className="float-right mb-3 mt-3 block"
        direction="left"
        isOpen={dropdownOpen}
        toggle={toggle}
      >
        <DropdownToggle caret color="primary">
          Filter
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem
            onClick={() => history.push("/admin/view/students/1")}
          >
            1st Year Students
          </DropdownItem>
          <DropdownItem
            onClick={() => history.push("/admin/view/students/2")}
          >
            2nd Year Students
          </DropdownItem>
          <DropdownItem
            onClick={() => history.push("/admin/view/students/3")}
          >
            3rd Year Students
          </DropdownItem>
          <DropdownItem
            onClick={() => history.push("/admin/view/students")}
          >
            View All
          </DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
      {loading ? <div className="container text-center mt-5 pb-2" >

        <Spinner color="primary" />
      </div> :
        student.length < 1 ? (
          <Container>

            <Alert className="mt-2 text-center" color="light">
              No Data to Show
            </Alert>
          </Container>
        ) : (
          <>
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
            <Table search={true.toString()} className="table-responsive-lg" striped>
              <thead>
                <tr className="text-center">
                  <th>#</th>
                  <th>Enrollment Number</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Username</th>
                  <th>Department</th>
                  <th>Year</th>
                  <th>Semester</th>
                  <th>Address</th>
                  <th>Contact No.</th>
                  <th>Date Of Birth</th>
                  <th>Edit/Delete</th>
                </tr>
              </thead>
              <tbody>
                {student.filter((val) => {
                  
                  // if (search === "") {
                  //   return val;
                  // }
                  if (val.enrollmentNumber.toLowerCase().includes(search.toLowerCase()) || val.name.toUpperCase().includes(search.toUpperCase()) || val.name.includes(search)) {
                    return val;
                  }
                  if (val.name.toLowerCase().includes(search.toLowerCase()) || val.name.toUpperCase().includes(search.toUpperCase()) || val.name.includes(search)) {
                    return val;
                  
                  }
                  if (val.email.toLowerCase().includes(search.toLowerCase())) {
                    return val;
                  }
                  if (
                    val.username.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return val;
                  }
                  if (
                    val.department.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return val;
                  }

                })
                  .map((student, index) => {
                    return (
                      <tr key={student._id}>
                        <th className="text-center" scope="row">
                          {index + 1}
                        </th>
                        <td
                        className="text-center">{student.enrollmentNumber}</td>
                        <td
                        className="text-center">{student.name}</td>
                        <td
                        className="text-center">{student.email}</td>
                        <td
                        className="text-center">{student.username}</td>
                        <td
                        className="text-center">{student.department}</td>
                        <td
                        className="text-center">{student.year}</td>
                        <td
                        className="text-center">{student.semester}</td>
                        <td
                        className="text-center">{student.address}</td>
                        <td
                        className="text-center">{student.contact}</td>
                        <td
                        className="text-center">
                          {" "}
                          <Moment format="DD/MM/YYYY">{student.dob}</Moment>
                        </td>
                        <td
                        className="text-center"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: 'space-around'
                          }}
                        >
                          <IconButton
                            titleaccess="Delete"
                            style={{ padding: "0px !important" }}
                          >
                            <EditIcon onClick={() => history.push(`/admin/edit/${student._id}`)} />
                            {/* </Link> */}
                          </IconButton>

                          /
                          <IconButton
                            titleaccess="Delete"
                            style={{ padding: "0px !important" }}
                          >
                            <Delete onClick={() => deleteStudent(student._id)} />
                            {/* </Link> */}
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

export default Students;
