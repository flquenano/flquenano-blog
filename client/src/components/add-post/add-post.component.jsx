import React, { useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import bsCustomFileInput from "bs-custom-file-input";

import Editor from "../editor/editor.component";
import "./add-post.scss";

const AddPost = ({
  form,
  userInput,
  editor,
  setEditor,
  validated,
  submit,
  fileInput
}) => {
  useEffect(() => {
    bsCustomFileInput.init();
  }, []);

  return (
    <Container>
      <Row className="add-post">
        <Col lg={8} md={10} className="mx-auto">
          <Form noValidate validated={validated}>
            <Form.Group controlId="post_title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title"
                onChange={userInput}
                name="title"
                value={form.title}
                required
              />
            </Form.Group>

            <Form.Group controlId="post_subtitle">
              <Form.Label>Sub Title:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter subtitle"
                onChange={userInput}
                name="subtitle"
                value={form.subtitle}
              />
              <Form.Text className="text-muted">
                Text smaller and below the title
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="post_content">
              <Editor editorState={editor} editorStateChange={setEditor} />
            </Form.Group>
            <Form.Group style={{ margin: "30px 0px" }}>
              <Form.File
                id="custom-file"
                label="Image Banner"
                custom
                onChange={fileInput}
                name="img"
              />
              <Form.Text className="text-muted">
                Suggested size for the banner image is 1366 x 768 and Maximum
                size of 2MB
              </Form.Text>
            </Form.Group>

            <Form.Group className="form-sbmit">
              <Button style={{ float: "right" }} onClick={submit}>
                Submit
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddPost;
