import React, { useState, useEffect } from "react";
import "rc-time-picker/assets/index.css";

import axios from "axios";
import { Alert, Table, Container, Input, Spinner } from "reactstrap";
import { useHistory, Link } from "react-router-dom";
import { Delete } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import { useCookies } from "react-cookie";
import "react-datepicker/dist/react-datepicker.css";

function Result() {

  const [enrollmentNumber, setEnrollmentNumber] = useState("");
  const [result, setResult] = useState([]);
  const [cookies] = useCookies("user");
  const [msg, setMsg] = useState("");
  const history = useHistory("");
  const [loading, setLoading] = useState(false)

  const getResult = async () => {
    setLoading(true)
    await axios
      .get(`/admin/view/result/${enrollmentNumber.toUpperCase()}`)
      .then((res) => {
        setLoading(false)
        setResult(res.data)
      })
      .catch((err) => {
        setLoading(false)
        console.error(err)
      }
      );
  };

  useEffect(() => {
    if (!cookies.user || cookies.user.role !== "admin") {
      return history.push("/admin");
    }
    else getResult();

    // eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //   if (!cookies.user || cookies.user.role !== "admin") {
  //     return history.push("/admin");
  //   } else {
  //     getResult();
  //   }
  //   // eslint-disable-next-line
  // }, [result]);

  useEffect(() => {
    if (!cookies.user || cookies.user.role !== "admin") {
      return history.push("/admin");
    } else {
      getResult();
    }
    // eslint-disable-next-line
  }, [enrollmentNumber]);

  const deleteResult = async (id) => {
    window.confirm("Are you Sure ?");

    if (window.confirm) {
      setLoading(true)
      await axios
        .delete(`/admin/delete/mark/${id}`)
        .then((res) => setMsg(res.data.message))
        .catch((err) => console.error(err));
    }
  };
  const [visible, setVisible] = useState(true);

  const onDismiss = () => setVisible(false);
  return (
    <Container
      style={{ backgroundColor: "white" }}
      className="p-2 mt-2 wid "
    >
      <span>
        <Link to="/admin/dashboard">{'< '}Go Back</Link>
      </span>
      <h1 className="display-4 text-center"> Result</h1>
      <Input
        onChange={(e) => setEnrollmentNumber(e.target.value)}
        placeholder="Enter Your Enrollment Number"
        type="search"
      />{" "}
      {msg && (
        <Alert color="info" isOpen={visible} toggle={onDismiss}>
          {msg}
        </Alert>
      )}
      {loading ? <div className="container text-center mt-5 pb-2" >

        <Spinner color="primary" />

      </div> :

        result.length < 1 ? (
          <Container className="mt-5 p-2">
            <Alert className="mt-2 text-center" color="light">
              No Data to Show
            </Alert>
          </Container>
        ) : (
          <>
            <div
              className="p-3 mt-2 resp"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                border: "1px solid",
              }}
            >
              <h6 className="h6">Name: {result[0].name}</h6>
              <h6 className="h6">
                Enrollment Number: {result[0].enrollmentNumber}
              </h6>
              <h6 className="h6">Semester: {result[0].semester}</h6>
              <h6 className="h6">Department: {result[0].department}</h6>
            </div>

            <Table

              style={{ border: "1px solid" }}
              className="table-responsive-md"
              striped
            >
              <thead>
                <tr className="text-center">
                  <th>Subject Code</th>
                  <th>SubjectName</th>

                  <th>Obtained Marks</th>
                  <th>Total Marks</th>
                  <th>Cleared / Not Cleared</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {result.map((res) => {
                  return (
                    <tr key={res._id} className="text-center">
                      <th scope="row">{res.subjectCode}</th>
                      <td>{res.subject}</td>
                      <td>{res.obtainedMarks}</td>
                      <td>{res.totalMarks}</td>
                      <td>
                        {res.obtainedMarks <= (33 * res.totalMarks) / 100
                          ? "Not Cleared"
                          : "Cleared"}
                      </td>{" "}
                      <td
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <IconButton
                          onClick={() => deleteResult(res._id)}
                          titleaccess="Delete"
                          style={{ padding: "0px !important", margin: "auto" }}
                        >
                          <Delete />
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

export default Result;
