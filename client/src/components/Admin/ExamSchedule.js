import React, { useEffect, useState } from "react";
import { useHistory, useParams,Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import Moment from "react-moment";
import { Alert, Input, Container, Table, Button, Spinner } from "reactstrap";
import axios from "axios";
import { Delete } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";

function ExamSchedule() {
  const { year } = useParams("");

  const [exam, setExam] = useState(Array);
  const [cookies] = useCookies("user");
  const history = useHistory("");
  const [search, setSearch] = useState("");
  const [msg, setMsg] = useState("");
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false)
  const onDismiss = () => setVisible(false);
  const getExam = async () => {
    setLoading(true)
    if (year === "1" || year === "2" || year === "3") {
      try {
        const res = await axios
          .get(`/admin/exam/schedule/${year}`);
        setLoading(false)
        setExam(res.data);
      } catch (err) {
        setLoading(false)
        return console.error(err);
      }
    } else {
      try {
        const res_1 = await axios
          .get(`/admin/exam/schedule`);
        setLoading(false)
        setExam(res_1.data);
      } catch (err_1) {
        setLoading(false)
        return console.error(err_1);
      }
    }
  };

  const deleteExam = (id) => {
    window.confirm("Are you Sure ?");
    setLoading(true)
    if (window.confirm) {

      axios
        .delete(`/admin/delete/exam/${id}`)
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
      getExam();
    }
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (!cookies.user || cookies.user.role !== "admin") {
      return history.push("/admin");
    } else {
      getExam();
    }
    // eslint-disable-next-line
  }, [year]);
  useEffect(() => {
    if (!cookies.user || cookies.user.role !== "admin") {
      return history.push("/admin");
    } else {
      getExam()

    }
    // eslint-disable-next-line
  }, [exam.length]);

  return (
    <Container
      fluid
      style={{ backgroundColor: "white" }}
      className="p-2 mt-2 wid "
    >
      <span>
        <Link to="/admin/dashboard">{'< '}Go Back</Link>
      </span>
      <h1 className="display-4 text-center">Exam Schedule</h1>
      <Input
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
        type="search"
      />
      {msg && (
        <Alert
          className="mt-2 mb-2"
          color="info"
          isOpen={visible}
          toggle={onDismiss}
        >
          {msg}
        </Alert>
      )}
      <div className="p-2 mt-2 mb-2 ">
        <span className="mr-2">View By Year: </span>
        <Button
          className="mr-3"
          color="primary"
          onClick={() => history.push("/admin/view/exam/schedule/1")}
        >
          1st Year
        </Button>
        <Button
          onClick={() => history.push("/admin/view/exam/schedule/2")}
          className="mr-3"
          color="primary"
        >
          2nd Year
        </Button>
        <Button
          onClick={() => history.push("/admin/view/exam/schedule/3")}
          color="primary"
        >
          3rd Year
        </Button>
      </div>
      {
        loading ?
          <div className="container text-center mt-5 pb-2" >

            <Spinner color="primary" />

          </div> :


          exam.length < 1 ? (
            <Container>

              <Alert className="mt-2 text-center" color="light">
                No Data to Show
              </Alert>
            </Container>
          ) : (
            <div style={{ width: "100% !important" }}>
              <Table className="table-responsive-md" >
                <thead>
                  <tr className="text-center">
                    <th>Subject Code</th>
                    <th>Subject</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Sem</th>
                    <th>Department</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {exam
                    .filter((val) => {
                      if (search === "") {
                        return val;
                      }
                      if (
                        val.subject.toLowerCase().includes(search.toLowerCase())
                      ) {
                        return val;
                      }
                      if (val.sem.toLowerCase().includes(search.toLowerCase())) {
                        return val;
                      }
                      if (
                        val.department.toLowerCase().includes(search.toLowerCase())
                      ) {
                        return val;
                      }

                    })
                    .map((subject) => {
                      return (
                        <tr className="text-center" key={subject._id}>
                          <th scope="row">{subject.subjectCode}</th>
                          <td>
                            <>
                              <Moment format="DD/MM/YYYY">{subject.date}</Moment>
                            </>
                            ({subject.hrs})
                          </td>
                          <td>{subject.subject}</td>
                          <td>{subject.time}</td>
                          <td>{subject.semester}</td>
                          <td>{subject.department}</td>
                          <td
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <IconButton
                              titleaccess="Delete"
                              style={{ padding: "0px !important" }}
                            >
                              <Delete onClick={() => deleteExam(subject._id)} />
                              {/* </Link> */}
                            </IconButton>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </div>
          )
      }
    </Container>
  );
}

export default ExamSchedule;
