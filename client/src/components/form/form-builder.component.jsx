import React from "react";
import { Formik } from "formik";
import { Form, Button } from "react-bootstrap";

import { TextboxWithLabel } from "./Textboxt.component";

const formBuilder = ({
  submitMethod,
  validationSchema,
  initialValues,
  formSchema
}) => {
  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      validationSchema={validationSchema}
      onSubmit={(values) => submitMethod(values)}
      initialValues={initialValues}
    >
      {({ handleSubmit, handleChange, values, errors }) => {
        return (
          <Form noValidate onSubmit={handleSubmit}>
            {formSchema.map((field, idx) => (
              <TextboxWithLabel
                key={idx}
                placeholder={field.placeholder}
                value={values[field.name]}
                type={field.type}
                onChange={handleChange}
                name={field.name}
                label={field.label}
                isInvalid={errors[field.name]}
                error={errors[field.name]}
              />
            ))}
            {/* <FileUpload /> */}
            <br />
            <Button className="btn-block" variant="primary" type="submit">
              Register
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default formBuilder;
