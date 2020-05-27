import React, { useState, useContext, useEffect } from "react";
import { connect } from "react-redux";
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
import { errorAlert } from "../../Swal/Sweetalert.component";

import {
  createLoadingSelector,
  createErrorMessageSelector
} from "../../../redux/api/selector";
import { emailLoginStart } from "../../../redux/user/user.actions";

import "./login.scss";

const LoginComponent = ({ login, isLoading, isError }) => {
  const { values, handleChange } = useForm({
    email: "flcq27@gmail.com",
    password: "flcq0727"
  });

  useEffect(() => {
    if (isError) errorAlert("Login Failed!", isError);
  }, [isError]);

  const signIn = async () => {
    login({ credentials: values });
  };

  const keyPress = (e) => {
    if (e.keyCode == 13) {
      signIn();
    }
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
            onKeyDown={keyPress}
            name="email"
          />
        </Form.Group>
        <Form.Group controlId="user_password">
          <Form.Control
            type="password"
            placeholder="Password"
            value={values.password || ""}
            onChange={handleChange}
            onKeyDown={keyPress}
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
            <Card.Body>{isLoading ? spinner() : cardBody()}</Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

const mapDispatchToProps = (dispatch) => ({
  login: (credentials) => dispatch(emailLoginStart(credentials))
});

const loadingSelector = createLoadingSelector(["LOGIN"]);
const errorMessageSelector = createErrorMessageSelector(["LOGIN"]);

const mapStateToProps = (state) => ({
  isLoading: loadingSelector(state),
  isError: errorMessageSelector(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
