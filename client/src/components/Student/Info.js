import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Jumbotron } from "reactstrap";
import axios from "axios";
import Moment from "react-moment";
import { Spinner } from 'reactstrap';
function Info() {
  const history = useHistory("");
  const [user, setUser] = useState("");
  const [cookies] = useCookies("");

  const getUser = async () => {

    await axios
      .get(
        `/student/view/student/${cookies.user.id}`
      )
      .then((res) => {
        setUser(res.data)
      }
      )
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    if (cookies.user && cookies.user.role !== "student") {
      return history.push("/");
    }


    getUser()

    // eslint-disable-next-line
  }, []);


  if (!user) {
    return (
      <div div className="container text-center mt-5" ><Jumbotron>
        <Spinner color="primary" />
      </Jumbotron>
      </div>
    )
  }


  return (


    <div className="container text-center mt-5"    >

      <Link className="p-3 mt-0 ml-2 float-left block" to="/home">
        {"<<"} {""} Go Back
      </Link>
      <Jumbotron>

        <h1 className="display-3 h1 responsive ">Name: {user.name}</h1>

        <p className="lead">
          Email : {user.email} , Date Of Birth:{" "}
          <Moment className="lead" format="DD/MM/YYYY">
            {user.dob}
          </Moment>
        </p>
        <p className="lead">
          Semester : {user.semester} ,<span>Department: {user.department}</span>
        </p>
        <p className="lead">Your Contact Number : {user.contact}</p>
        <hr className="my-2" />
        <h5>Address:</h5>
        <p>{user.address}</p>


      </Jumbotron>
    </div >
  );
}

export default Info;
