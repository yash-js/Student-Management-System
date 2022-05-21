
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
function Contact() {
  
    const [subject, setSubject] = useState("");
    const [error, setError] = useState("");
    const history = useHistory("");
    const [cookies, setCookie] = useCookies([]);
    const [loading, setLoading] = useState(false)
    const [msg, setMsg] = useState("")
    const [message, setMessage] = useState("")
    const email = cookies.user.email
    // 
    const send = async () => {
        if (!email || !subject || !message) return setError("All Fields Are Required!");
        setError("");
        setLoading(true)
        try {
            const response = await axios({
                method: "post",
                url: `/student/contact`,
                data: { email, subject, messageForAdmin: message },
                headers: {
                    "Access-Control-Allow-Origin": "*",
                },
            });

            setSubject("")
            setMessage("")
            setLoading(false)
            setMsg("Message Sent !")
        } catch (err) {
            console.log(err);
            setLoading(false)
            // setError(err.response.data.error);
            if (err) {
                setVisible(true);
                setError(err.response.data.error);
            }

        }
    };

    useEffect(() => {
        if (cookies.user && cookies.user.role !== "student") {
            return history.push("/");
        }
        // eslint-disable-next-line
    }, []);
    const [visible, setVisible] = useState(true);

    const onDismiss = () => {
        setMsg("")
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

                < Spinner color="primary" />
            </div > :
                <Form
                    className="p-5 "
                    style={{
                        backgroundColor: "#ffffff8f",
                        borderRadius: "5px",
                        border: "1px solid black",
                    }}
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                >
                    {error.length > 1 && (
                        <Alert color="danger" isOpen={visible} toggle={onDismiss}>
                            {error}
                        </Alert>
                    )}
                    {msg.length > 1 && (
                        <Alert color="success" isOpen={visible} toggle={onDismiss}>
                            {msg}
                        </Alert>
                    )}
                    {loading && <Spinner color="primary" />}

                    <h1 className="text-center mt-0">Contact Admin</h1>{" "}
                    <FormGroup>
                        <Label for="exampleEmail">Your Email Id</Label>
                        <Input
                            disabled

                            type="email"
                            value={email}
                            placeholder="Enter Your Email Id"

                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Subject</Label>
                        <Input
                            onChange={(e) => setSubject(e.target.value)}
                            required={true}
                            value={subject}
                            type="text"
                            placeholder="Subject"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleText">Message For Admin</Label>
                        <Input placeholder="Enter Message For Admin" type="textarea" onChange={e => setMessage(e.target.value)} />
                    </FormGroup>
                    <Button type='submit' onClick={send} color="primary">
                        Send
                    </Button>

                    <div className="mt-2">
                        <Link to="/">{"<<"} Go Back</Link>
                    </div>
                </Form>
            }
        </Container>
    );
}

export default Contact
