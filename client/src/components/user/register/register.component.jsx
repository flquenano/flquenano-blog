import React, { useContext } from "react";

//Redux
import { useSelector, useDispatch } from "react-redux";
import {
  createErrorMessageSelector,
  createLoadingSelector
} from "../../../redux/api/selector";
import { registerStart } from "../../../redux/user/user.actions";

import * as Yup from "yup";
import FormBuilder from "../../form/form-builder.component";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./register.scss";

const Register = () => {
  const dispatch = useDispatch();
  const loadingSelector = createLoadingSelector(["REGISTER"]);
  const errorSelector = createErrorMessageSelector(["REGISTER"]);

  const registerUtil = useSelector((state) => ({
    isLoading: loadingSelector(state),
    isError: errorSelector(state)
  }));

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min("2", "Minimum of 2 Characters")
      .max("75", "Maximum of 75 Characters")
      .matches(/^[a-zA-Z ]+$/, "Invalid Input! Here")
      .required("Required!"),
    acctName: Yup.string()
      .min("5", "Minimum of 5 Characters")
      .max("15", "Maximum of 15 Characters")
      .matches(
        /^[a-zA-Z0-9]+$/,
        "Account Name can only be a mix of Alphanumeric and Numeric characters"
      )
      .required("Required!"),
    email: Yup.string().email("Invalid Email").required("Required!"),
    password: Yup.string().required("Password is required"),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref("password"), null], "Please enter the same password!")
      .required("Required!")
  });

  const formSchema = [
    {
      name: "name",
      label: "Name: ",
      placeholder: "Full Name",
      type: "text"
    },
    {
      name: "acctName",
      label: "Account Name: ",
      placeholder: "Name to be Displayed",
      type: "text"
    },
    {
      name: "email",
      label: "Email: ",
      placeholder: "Email Address",
      type: "email"
    },
    {
      name: "password",
      label: "Password: ",
      type: "password",
      placeholder: "Password"
    },
    {
      name: "passwordConfirm",
      label: "Confirm Password: ",
      type: "password",
      placeholder: "Confirm Password"
    }
  ];

  const initialValues = {
    name: "sample",
    email: "sample@gmail.com",
    acctName: "sampleAcctName",
    password: "sample123",
    passwordConfirm: "sample123"
  };

  const register = (user) => {
    const data = {
      name: user.name,
      account_name: user.acctName,
      email: user.email,
      password: user.password
    };
    dispatch(registerStart(data));
  };

  const form = (
    <FormBuilder
      submitMethod={register}
      validationSchema={validationSchema}
      initialValues={initialValues}
      formSchema={formSchema}
    />
  );

  return (
    <Container fluid>
      <Row id="register-wrapper">
        <Col md={12}>
          <Card className="Card">
            <Card.Header>
              <div>
                <h3>Register</h3>
                <br />
                <h6>Please fill the form below to register a new account.</h6>
              </div>
            </Card.Header>
            <Card.Body style={{ minHeight: "414px" }}>{form}</Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
