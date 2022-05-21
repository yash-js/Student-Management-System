import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { useCookies } from "react-cookie";

import { Input, Container, Button, FormGroup, Label, Form } from "reactstrap";

function AddResult() {
  const [resultSem, setResultSem] = useState("");
  const [resultDepartment, setResultDepartment] = useState("");
  const [cookies] = useCookies("user");

  const history = useHistory("");

  const createResult = () => {
    history.push(`/admin/add/result/${resultDepartment}/${resultSem}`);
  };

  useEffect(() => {
    if (!cookies.user || cookies.user.role !== "admin") {
      return history.push("/admin");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Container
      style={{ backgroundColor: "white", borderRadius: ".25rem" }}
      className="p-5  pb-5 mt-4 "
    >
      <Form
        onSubmit={(e) => e.preventDefault()}
        className="mt-2 p-1"

      >
        <span>
          <Link to="/admin/dashboard">{'< '}Go Back</Link>
        </span>
        {" "}
        <h4 className="display-5">Add Result </h4>
        <FormGroup>
          <Label>Department:</Label>
          <Input
            onChange={(e) => setResultDepartment(e.target.value)}
            type="select"
            required
          >
            <option selected>Select</option>
            <option value="BCA">BCA</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label>Choose Semester:</Label>
          <Input
            required
            onChange={(e) => setResultSem(e.target.value)}
            type="select"
          >
            <option selected>Select</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </Input>
          {!resultDepartment || !resultSem ? (
            <Button disabled className="mt-2" color="primary" size="small">
              Create
            </Button>
          ) : (
            <Button
              type="submit"
              className="mt-2"
              color="primary"
              size="small"
              onClick={createResult}
            >
              Create
            </Button>
          )}
        </FormGroup>
      </Form>
    </Container>
  );
}

export default AddResult;
