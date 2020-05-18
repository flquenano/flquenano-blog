import React, { useState, useEffect, useRef } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { EditorState, convertToRaw } from "draft-js";
import bsCustomFileInput from "bs-custom-file-input";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { NavBackground } from "../navigation/nav.background";
import API from "../../util/fetchAPI.util";
import Editor from "../editor/editor.component";

import "./add-post.scss";
const AddPost = () => {
  const history = useHistory();
  const { url } = useRouteMatch();
  const MySwal = withReactContent(Swal);

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({
    title: "My One and Only",
    subtitle: "A Poem dedicated to the person that colored my world",
    content: "",
    img: ""
  });

  //didMount
  useEffect(() => {
    bsCustomFileInput.init();
  }, []);

  const userInput = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  const fileInput = async (event) => {
    setForm({ ...form, img: event.target.files[0] });
  };

  const submit = async (e) => {
    try {
      setValidated(true);
      if (form.title === "") {
        return;
      }

      if (!editorState.getCurrentContent().hasText()) {
        MySwal.fire({
          title: <p>Editor Empty!</p>,
          icon: "warning",
          showConfirmButton: true
        });
        return;
      }
      const data = new FormData();
      const editorJSON = JSON.stringify(
        convertToRaw(editorState.getCurrentContent())
      );
      data.append("title", form.title);
      data.append("subtitle", form.subtitle);
      data.append("content", editorJSON);
      data.append("image_banner", form.img);
      const res = await API.create("/posts", true, data);
      MySwal.fire({
        title: <p>Posted!</p>,
        icon: "success",
        showConfirmButton: true,
        onClose: () => {
          history.push({
            pathname: `/blog/posts/${form.title.replace(/\s/g, "-")}`,
            state: { id: res.id }
          });
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <NavBackground />
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
                <Editor
                  editorState={editorState}
                  editorStateChange={setEditorState}
                />
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
    </>
  );
};

export default AddPost;
