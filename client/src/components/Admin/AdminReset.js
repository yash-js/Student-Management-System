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

function AdminReset() {
  const [email, setEmail] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const history = useHistory("");
  const [cookies] = useCookies([]);
  const [loading, setLoading] = useState(false);
  const resetPassword = async () => {
    try {
      setLoading(true);
      const response = await axios({
        method: "post",
        url: `/admin/reset-password`,
        data: { email },
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      console.log(response);
      setLoading(false);
      setMessage(response.data.message);

      setTimeout(() => {
        history.push("/admin");
      }, 5000);
    } catch (err) {
      setLoading(false)
      setError(err.response.data.error);
      if (err) {
      setError(err.response.data.error);   
        setVisible(true);
      }
    }
  }

  useEffect(() => {
    if (cookies.user && cookies.user.role === "admin") {
      return history.push("/admin");
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
      <Form
        className="p-5"
        style={{
          backgroundColor: "#ffffff8f",

          border: "1px solid black",
        }}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        {" "}
        {error !== "" && (
            <Alert color="danger" isOpen={visible} toggle={onDismiss}>
              {error}
            </Alert>
          )}
        {message ? (
          <>
            {error !== "" && setError("")}
            <Alert color="success" isOpen={visible} toggle={onDismiss}>
              {message} Redirecting To Login Page in 5 seconds
            </Alert>
          </>
        ) : (
          ""
        )}{" "}
        {loading && <Spinner color="primary" />}
        <h1 className="text-center p-3">Reset Password</h1>{" "}
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input
            required={true}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter Your Registered Email"
          />
        </FormGroup>
        <Button
          disabled={!email && true}
          className="mr-2"
          onClick={()=>resetPassword()}
          color="primary"
        >
          Reset
        </Button>
        <Link to="/admin">Go back to Login</Link>
      </Form>
    </Container>
  );
}

export default AdminReset;
