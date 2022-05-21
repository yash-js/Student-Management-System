import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { useCookies } from "react-cookie";

import { Alert, Input, Container, Table, Spinner } from "reactstrap";
import axios from "axios";
import { Delete } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";

function Admins() {

  const [admin, setAdmin] = useState([]);
  const [cookies] = useCookies("user");
  const history = useHistory("");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(true);

  const onDismiss = () => setVisible(false);
  const getAdmin = async () => {
    setLoading(true)
    await axios
      .get(`/admin/view/admins`)
      .then((res) => {
        setLoading(false)
        return setAdmin(res.data);
      })
      .catch((err) => setError(err.message));
  };

  const deleteAdmin = async (id) => {
    window.confirm("Are you Sure ?");
    if (window.confirm) {
      setLoading(true)
      await axios
        .delete(
          `/admin/delete/admin/${id}`
        )
        .then((res) => {
          setLoading(false)
          setMsg(res.data.message)
        })
        .catch((err) => setError(err.message));
    }
    else {
      return;
    }
  };

  useEffect(() => {
    if (!cookies.user || cookies.user.role !== "admin") {
      return history.push("/admin");
    } else {
      getAdmin();
    }
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (!cookies.user || cookies.user.role !== "admin") {
      return history.push("/admin");
    } else {
      getAdmin();
    }
    // eslint-disable-next-line
  }, [window.confirm]);
  useEffect(() => {
    if (!cookies.user || cookies.user.role !== "admin") {
      return history.push("/admin");
    } else {
      getAdmin();
    }

  }, [visible]);
  useEffect(() => {
    if (!cookies.user || cookies.user.role !== "admin") {
      return history.push("/admin");
    } else {

      const getA = admin.filter(a => a.name === search.toLowerCase())
      setAdmin(getA)
    }
    // eslint-disable-next-line

  }, [search]);


  return (
    <Container fluid
      style={{ backgroundColor: "white" }}
      className="p-2 mt-2 wid " >
      <span>
        <Link to="/admin/dashboard">{'< '}Go Back</Link>
      </span>
      <h1 className="display-4 text-center"> Admins</h1>
      <Input
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
        type="search"
      />
      {
        loading ?
          <div className="container text-center mt-5 pb-2" >

            <Spinner color="primary" />

          </div> :
          admin.length < 1 ? (
            <Container>
              <Alert className="mt-2 text-center" color="light">
                No Data to Show
              </Alert>
            </Container>
          ) : (
            <>
              <div className="p-2 mt-2 mb-2 ">
                {msg && (
                  <Alert color="info" isOpen={visible} toggle={onDismiss}>
                    {msg}
                  </Alert>
                )}
                {error && (
                  <Alert color="info" isOpen={visible} toggle={onDismiss}>
                    {error}
                  </Alert>
                )}
              </div>
              <Table
                style={{ width: '100% !important' }}
                className=" table-responsive-md"
                striped
              >

                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {admin
                    .filter((val) => {
                      if (val.name.toLowerCase().includes(search.toLowerCase())) {


                        return val;
                      }


                    })
                    .map((admin, index) => {

                      return (
                        <tr key={admin._id}>
                          <th scope="row">{index + 1}</th>
                          <td>{admin.name}</td>
                          <td>{admin.email}</td>

                          <td
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <IconButton
                              disabled={admin.name == "Yash" ? true : false}
                              onClick={() => deleteAdmin(admin._id)}
                              titleaccess="Delete"
                              style={{ padding: "0px !important" }}
                            >
                              <Delete />
                            </IconButton>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </>
          )
      }
    </Container >
  );
}

export default Admins;
