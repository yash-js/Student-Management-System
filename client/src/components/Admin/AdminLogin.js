import { Link, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
  Alert,
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Spinner,
} from "reactstrap";
import { useCookies } from "react-cookie";
import axios from "axios";
function AdminLogin() {
  const [email, setEmail] = useState("");


  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory("");
  const [cookies, setCookie] = useCookies([]);
  const [loading, setLoading] = useState(false)
  const login = async () => {
    if (!email || !password) return setError("All Fields Are Required!");
    setError("");
    setLoading(true)
    try {
      const response = await axios({
        method: "post",
        url: `/admin/signin`,
        data: { email, password },
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });

      if (response.data.error) {
        setVisible(true);
        return setError(response.data.error);
      }
      setVisible(false);
      const getData = response.data.user;

      const userData = {
        name: getData.name,
        email: getData.email,
        role: getData.role,
        id: getData._id,
        token: response.data.token,
      };

      setCookie("user", userData, {
        path: "/admin",
        maxAge: 84000,
      });

      history.push("/admin/dashboard");
      setLoading(false)
    } catch (err) {
      console.log(err);
      setLoading(false)
      setError(err.response.data.error);
      if (err) {
      setError(err.response.data.error);

   
        setVisible(true);
      }
    }
  };

  useEffect(() => {
    if (cookies.user && cookies.user.role === "admin") {
      return history.push("/admin/view/students");
    }
    // eslint-disable-next-line
  }, []);
  const [visible, setVisible] = useState(true);

  const onDismiss = () => setVisible(false);

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

        < Spinner color="primary" />
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
          
          {error !== "" && (
            <Alert color="danger" isOpen={visible} toggle={onDismiss}>
              {error}
            </Alert>
          )}
          {loading && <Spinner color="primary" />}

          <h1 className="text-center p-3">Admin Login</h1>{" "}
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input
              required='true'
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email Id"
              value={email}
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
          <Button disabled={!email || !password && true } onClick={login} color="primary">
            Login
          </Button>
          <Link className="ml-2" to="/admin/forgot-password">
            Forgot Password?
          </Link>
          <div className="mt-2">
            <Link to="/">{"<<"} Student Login</Link>
          </div>
        </Form>
      }
    </Container>
  );
}

export default AdminLogin;
