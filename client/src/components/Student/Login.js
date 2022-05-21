import React, { useState, useEffect } from "react";
import {
  Alert,
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Spinner
} from "reactstrap";
import { useCookies } from "react-cookie";

import axios from "axios";
import { Link, useHistory } from "react-router-dom";
function Login() {
  const [username, setUsername] = useState("");

  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory("");
  const [cookies, setCookie] = useCookies([]);

  const login = async () => {
    setLoading(true)
    try {
      const response = await axios({
        method: "post",
        url: `http://localhost:5000/student/signin`,
        data: { username, password },
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });

      if (response.data.error) {
        setLoading(false)
        return setError(response.data.error);
      }
      const getData = response.data.user;

      const userData = {
        name: getData.name,
        username: getData.username,
        email: getData.email,
        role: getData.role,
        department: getData.department,
        semester: getData.semester,
        contact: getData.contact,
        address: getData.address,
        id: getData._id,
        dob: getData.dob,
        token: response.data.token,
        enrollmentNumber: getData.enrollmentNumber,
      };

      setCookie("user", userData, {
        path: "/",
        maxAge: 84000,
      });
      setLoading(false)
      history.push("/home");
    } catch (err) {
      setLoading(false)

      setError(err.response.data.error);
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (cookies.user && cookies.user.role === "student") {
      return history.push("/home");
    }
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (cookies.user && cookies.user.role === "student") {
      history.push("/home");
    }
    // eslint-disable-next-line
  }, [cookies]);

  const [visible, setVisible] = useState(true);

  const onDismiss = () => {
    setError("")
    setVisible(false)

  };

  return (

    <Container
      fluid="sm"
      style={{
        display: "flex",
        alignItems: "center",
        height: "100vh",
        justifyContent: "center",
      }}
    >
      {loading ? <div
        className="container text-center mt-5 pb-2">

        <Spinner color="primary" />
      </div > :
        <Form
          className="p-5 "
          style={{
            backgroundColor: "#ffffff8f",
            border: "1px solid black",
          }}
          onSubmit={(e) => {
            e.preventDefault();

          }}
        >
          {" "}
          {error ? (
            <Alert color="danger" isOpen={visible} toggle={onDismiss}>
              {error}
            </Alert>
          ) : (
            ""
          )}{" "}
          <h1 className="text-center p-3">Student Login</h1>{" "}
          <FormGroup>
            <Label for="exampleEmail">Username</Label>
            <Input
              required={true}
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Your Username"
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              required={true}
              value={password}
              type="password"
              placeholder="Enter Your Password!"
            />
          </FormGroup>
          <Button type="submit" onClick={login} className="mr-2" color="primary">
            Login
          </Button>
          <Link to="/forgot-password">Forgot Password?</Link>
        </Form>}
    </Container >
  );
}

export default Login;
