import { Link, useHistory, useParams } from "react-router-dom";
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
function AdminNewPassword() {
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const history = useHistory("");
  const [cookies] = useCookies([]);
  const { token } = useParams();
  const [loading, setLoading] = useState(false);
  const resetPassword = async () => {
    setLoading(true);
    try {
      const response = await axios({
        method: "post",
        url: `/admin/new-password`,
        data: { password, cPassword, token },
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      setLoading(false);
      setPassword("");
      setCPassword("");
      if (response.data && response.data.error) {
        return setError(response.data.error);
      }
      if (response.data.message) {
        setTimeout(() => {
          return history.push("/");
        }, 5000);
        return setMessage(response.data.message);
      }
    } catch (err) {
      setLoading(false);
      setError(err.response.data.error);
      if (err) {
        setError(err.response.data.error);
        setVisible(true);
      }
    }
  };

  useEffect(() => {
    if (cookies.user && cookies.user.role === "admin") {
      history.push("/admin");
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
        {message ? (
          <>
            {error && setError("")}
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
          <Label for="exampleEmail">Password</Label>
          <Input
            required={true}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Your Password"
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Confirm Password</Label>
          <Input
            required={true}
            type="password"
            onChange={(e) => setCPassword(e.target.value)}
            placeholder="Confirm Your Password"
          />
        </FormGroup>
        <Button onClick={resetPassword} color="primary">
          Update
        </Button>
        <Link to="/admin">Go back to Login</Link>
      </Form>
    </Container>
  );
}

export default AdminNewPassword;
