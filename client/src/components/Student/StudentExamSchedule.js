import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import Moment from "react-moment";
import { Alert, Container, Table, Jumbotron, Spinner } from "reactstrap";
import axios from "axios";

function StudentExam() {
  const { sem } = useParams("");

  const [exam, setExam] = useState(Array);
  const [cookies] = useCookies("user");
  const history = useHistory("");
  const [loading, setLoading] = useState(false)

  const getExam = async () => {

    if (
      sem === "1" ||
      sem === "2" ||
      sem === "3" ||
      sem === "4" ||
      sem === "5" ||
      sem === "6"
    ) {
      setLoading(true)
      try {
        await axios
          .get(`/student/exam/schedule/${sem}`).then(res => {
            if (res.data) {
              setLoading(false)
              return setExam(res.data);
            }
          }).catch(err => console.log(err))


      } catch (err) {
        return console.error(err);
      }
    }
  };

  useEffect(() => {
    if (!cookies.user || cookies.user.role !== "student") {
      return history.push("/");
    } else {
      getExam();
    }
    // eslint-disable-next-line
  }, []);



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
      className="p-2 mt-2 wid "
    >

      <Link className="p-2 mt-5" to="/home">
        {"<<"} {""} Go Back
      </Link>

      <h1 className="display-4 text-center">Exam Schedule</h1>


      {exam.length < 1 ? (
        <Container>
          <Alert className="mt-2 text-center" color="light">
            No Data to Show
          </Alert>
        </Container>
      ) : (
        <>
          <Table className="table-responsive-md" striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Subject</th>
                <th>Time</th>
                <th>Sem</th>
                <th>Department</th>
              </tr>
            </thead>
            <tbody>
              {exam.map((subject, index) => {
                return (
                  <tr key={subject._id}>
                    <th scope="row">{index + 1}</th>
                    <td>
                      <>
                        <Moment format="DD/MM/YYYY">{subject.date}</Moment>
                      </>
                    </td>
                    <td>{subject.subject}</td>
                    <td>{subject.time}</td>
                    <td>{subject.semester}</td>
                    <td>{subject.department}</td>
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

export default StudentExam;
