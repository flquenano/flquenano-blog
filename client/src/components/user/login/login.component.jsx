import React, { useState } from "react";
import { useForm } from "../../../hooks/form.hook.jsx";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Spinner
} from "react-bootstrap";
import emailSignIn from "./login";

import "./login.scss";

const LoginComponent = () => {
  const [loader, setLoader] = useState(false);

  const { values, handleChange } = useForm({
    email: "flcq27@gmail.com",
    password: "flcq0727"
  });

  const signIn = async () => {
    setLoader(true);
    const res = await emailSignIn(values);
    if (res.status) {
      alert("Login Successful!");
    } else {
      alert("Login Failed");
    }
    setLoader(false);
  };

  const spinner = () => (
    <div className="spinner">
      <Spinner animation="border" className="spinner-icon" />
    </div>
  );

  const cardBody = () => (
    <div>
      <Card.Title className="card-icon">FL</Card.Title>
      <Form>
        <Form.Group controlId="user_email">
          <Form.Control
            type="email"
            placeholder="Email"
            value={values.email || ""}
            onChange={handleChange}
            name="email"
          />
        </Form.Group>
        <Form.Group controlId="user_password">
          <Form.Control
            type="password"
            placeholder="Password"
            value={values.password || ""}
            onChange={handleChange}
            name="password"
          />
        </Form.Group>
        <Button className="btn-block login-btn" onClick={signIn}>
          Login
        </Button>
      </Form>
    </div>
  );
  return (
    <Container fluid className="login-bg">
      <Row id="login-wrapper" className="justify-content-center">
        <Col lg={8} md={10}>
          <Card className="Card ">
            <Card.Body>{loader ? spinner() : cardBody()}</Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginComponent;
