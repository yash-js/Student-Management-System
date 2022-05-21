import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { useCookies } from "react-cookie";

import { Input, Container, Button, FormGroup, Label,Form } from "reactstrap";

function Create() {
  const [examSem, setExamSem] = useState("");
  const [examDepartment, setExamDepartment] = useState("");
  const [cookies] = useCookies("user");


  const history = useHistory("");

  const createExam = () => {
    history.push(`/admin/add/exam/schedule/${examDepartment}/${examSem}`);
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
        {" "}
        <span className="mb-2">
          <Link to="/admin/dashboard">{'< '}Go Back</Link>
        </span>
        <h4 className="display-5">Add New Exam Schedule</h4>
        <FormGroup>
          <Label>Department:</Label>
          <Input
            onChange={(e) => setExamDepartment(e.target.value)}
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
            onChange={(e) => setExamSem(e.target.value)}
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
          <Button
            className="mt-2"
            onClick={createExam}
            color="primary"
            type="submit"
            size="small"
          >
            Create
          </Button>
        </FormGroup></Form>
    </Container>
  );
}

export default Create;
