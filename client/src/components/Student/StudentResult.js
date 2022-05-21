import React, { useState, useEffect } from "react";
import "rc-time-picker/assets/index.css";

import axios from "axios";
import { Alert, Table, Container, Jumbotron, Spinner } from "reactstrap";
import { useParams, Link } from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";

function StudentResult() {


  const [result, setResult] = useState([]);

  const [error, setError] = useState("");

  const { enrollment } = useParams("");
  const [loading, setLoading] = useState(false)
  const getResult = async () => {
    setLoading(true)
    await axios
      .get(`/student/view/result/${enrollment.toUpperCase()}`)
      .then((res) => {
        setLoading(false)
        setResult(res.data);
        if (res.data.error) {
          setError(res.data.error);
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const [visible, setVisible] = useState(true);

  const onDismiss = () => setVisible(false);


  if (loading) {
    return (
      <div className="container text-center mt-5" >
        <Jumbotron>
          <Spinner color="primary" />
        </Jumbotron>
      </div>
    )
  }

  return (
    <Container
      style={{ backgroundColor: "white" }}
      className="p-2 mt-2 wid table-responsive "
    >
      <Link className="p-2 mt-5" to="/home">
        {"<<"} {""} Go Back
      </Link>

      <h1 className="display-4 text-center"> Result</h1>

      {error && (
        <Alert
          color="info"
          className="mt-2 mb-2"
          isOpen={visible}
          toggle={onDismiss}
        >
          {error}
        </Alert>
      )}
      {result.length < 1 ? (
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
            className="table-lg-responsive mt-2"
            striped
          >
            <thead>
              <tr className="text-center">
                <th>Subject Code</th>
                <th>SubjectName</th>
                <th>Obtained Marks</th>
                <th>Total Marks</th>
                <th>Cleared / Not Cleared</th>
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

export default StudentResult;
