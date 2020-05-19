import React, { useState, useContext, useEffect } from "react";
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
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import emailSignIn from "./login";
import authContext from "../../../context/store";

import "./login.scss";

const LoginComponent = () => {
  const [loader, setLoader] = useState(false);
  const [state, dispatch] = useContext(authContext);
  const history = useHistory();
  const swal = withReactContent(Swal);

  const { values, handleChange } = useForm({
    email: "",
    password: ""
  });

  const signIn = async () => {
    setLoader(true);
    const res = await emailSignIn(values);
    setLoader(false);
    if (res.status) {
      dispatch({ type: "LOGIN", payload: { name: res.user.name } });
      swalSucess();
    } else {
      swalFailed();
    }
  };

  const swalSucess = () =>
    swal
      .fire({
        title: "Login Success!",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        allowOutsideClick: false
      })
      .then(() => {
        history.push("/blog/dashboard");
      });

  const swalFailed = () =>
    swal.fire({
      title: "Login Failed!",
      icon: "error",
      timer: 2000,
      showConfirmButton: false,
      allowOutsideClick: false
    });

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
