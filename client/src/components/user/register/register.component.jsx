import React, { useContext } from "react";
import * as Yup from "yup";
import FormBuilder from "../../form/form-builder.component";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import "./register.scss";

import API from "../../../util/fetchAPI.util";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import authContext from "../../../context/store";

const Register = () => {
  const MySwal = withReactContent(Swal);
  const history = useHistory();
  const [state, dispatch] = useContext(authContext);

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
    name: "",
    email: "",
    acctName: "",
    password: "",
    passwordConfirm: ""
  };

  const register = async (user) => {
    try {
      const data = {
        name: user.name,
        account_name: user.acctName,
        email: user.email,
        password: user.password
      };

      const res = await API.create(
        "/user/register",
        true,
        JSON.stringify(data),
        "",
        true
      );
      if (res.status === "success") {
        MySwal.fire({
          title: <p>Registration Successful!</p>,
          icon: "success",
          timer: 1000,
          showConfirmButton: false
        }).then(function () {
          dispatch({ type: "LOGIN", payload: { name: res.data.user.name } });
          Cookies.set("token", res.token, { domain: "flquenano.dev" });
          Cookies.set("name", res.user.name, { domain: "flquenano.dev" });
          history.push({
            pathname: "/dashboard"
          });
        });
      } else {
        MySwal.fire({
          title: <p>{res.message}</p>,
          icon: "error",
          showConfirmButton: true
        });
      }
    } catch (e) {}
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
