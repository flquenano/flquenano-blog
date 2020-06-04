import React, { useState, useEffect, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import bsCustomFileInput from "bs-custom-file-input";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { createLoadingSelector } from "../../redux/api/selector";
import { editPostStart, getPostStart } from "../../redux/post/post.actions";

import API from "../../util/fetchAPI.util";
import Editor from "../editor/editor.component";
import Spinner from "../spinner/spinner.component";
import { NavBackground } from "../navigation/nav.background";

import "./edit-post.scss";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const EditPost = ({
  form,
  editor,
  setEditor,
  userInput,
  fileInput,
  submit
}) => {
  useEffect(() => {
    console.log(form);
  }, []);
  return (
    <Container>
      <br />
      <Row className="add-post">
        <Col lg={8} md={10} className="mx-auto">
          <Form>
            <Form.Group controlId="post_title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title"
                onChange={userInput}
                name="title"
                value={form.title}
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
                label={form.img.name}
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

export default EditPost;
