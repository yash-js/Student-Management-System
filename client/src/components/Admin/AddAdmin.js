import React, { useState, useEffect } from "react";

import axios from "axios";
import { Alert, Button, Form, FormGroup, Label, Input, Spinner } from "reactstrap";
import { useHistory, Link } from "react-router-dom";

import { useCookies } from "react-cookie";
import "react-datepicker/dist/react-datepicker.css";


function AddStudent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [cPassword, setCPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [cookies] = useCookies("user");
  const history = useHistory("");
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (cookies.user && cookies.user.role !== "admin") {
      return history.push("/");
    }
    // eslint-disable-next-line
  }, []);

  const add = async () => {
    setLoading(true)
    try {
      const response = await axios({
        method: "post",
        url: `/admin/signup`,
        data: {
          name,
          password,
          cPassword,
          email,
        },
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });

      if (response.data.error) {
        setLoading(false)
        return setError(response.data.error);
      }
      setLoading(false)
      setName("");
      setEmail("");
      setPassword("");
      setCPassword("");
      setMessage("Admin Added!");
    } catch (err) {
      setLoading(false)
      console.log(err);

      //   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
    }
  };
  const [visible, setVisible] = useState(true);





  const onDismiss = () => setVisible(false);
  return (
    <Form
      onSubmit={(e) => e.preventDefault()}
      className="mt-2 p-5"
      style={{ width: "80%", margin: "auto", background: " white" }}
    >
      <span>
        <Link to="/admin/dashboard">{'< '}Go Back</Link>
      </span>
      {loading && <Spinner color="primary" />}
      {message && (
        <Alert color="success" isOpen={visible} toggle={onDismiss}>
          {message}
        </Alert>
      )}
      {error && (
        <Alert color="danger" isOpen={visible} toggle={onDismiss}>
          {error}
        </Alert>
      )}

      <h1 className="text-center  ">Enter Admin Details</h1>

      <FormGroup>
        <Label for="exampleEmail">Name</Label>
        <Input
          onChange={(e) => setName(e.target.value)}
          type="text"
          value={name}
          placeholder="Enter Name"
        />
      </FormGroup>

      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="email"
          name="email"
          id="exampleEmail"
          value={email}
          placeholder="Enter Email"
        />
      </FormGroup>

      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          value={password}
          name="password"
          placeholder="Password"
        />
      </FormGroup>

      <FormGroup>
        <Label for="examplePassword">Confirm Password</Label>
        <Input
          onChange={(e) => setCPassword(e.target.value)}
          type="password"
          name="password"
          value={cPassword}
          placeholder="Confirm Password"
        />
      </FormGroup>

      <Button type="submit" onClick={add}>Add</Button>
    </Form>
  );
}

export default AddStudent;
