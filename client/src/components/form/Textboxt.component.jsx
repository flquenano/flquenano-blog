import React from "react";
import { Form, InputGroup } from "react-bootstrap";

export const TextboxWithLabel = ({ label, error, name, ...otherProps }) => (
  <>
    <Form.Group controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control name={name} {...otherProps} />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  </>
);

export const TextboxWithIcon = ({ id, icon, type = "text", ...otherProps }) => (
  <>
    <Form.Group controlId={id}>
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text>{icon}</InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control type={type} {...otherProps} />
      </InputGroup>
    </Form.Group>
  </>
);

export const Textarea = ({ id, label, error, ...otherProps }) => (
  <>
    <Form.Group controlId={id}>
      <Form.Label>{label}</Form.Label>
      <Form.Control as="textarea" row="5" {...otherProps} />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  </>
);
