import React, { useState, useEffect, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import bsCustomFileInput from "bs-custom-file-input";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import API from "../../util/fetchAPI.util";
import Editor from "../editor/editor.component";
import Spinner from "../spinner/spinner.component";
import { NavBackground } from "../navigation/nav.background";

import "./edit-post.scss";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const AddPost = () => {
  const history = useHistory();
  const location = useLocation();
  const MySwal = withReactContent(Swal);

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    content: "",
    img: {
      name: "Image Banner"
    }
  });
  const [loading, setLoading] = useState(true);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  //didMount
  useEffect(() => {
    bsCustomFileInput.init();
    const getPost = async () => {
      if (location.state === undefined) {
        return history.push("/blog/404");
      }
      const res = await API.get(`/posts/${location.state.id}`, false);
      console.log(res); // must be true
      setForm({
        ...form,
        title: res.title,
        subtitle: res.subtitle
      });
      setEditorState(
        EditorState.createWithContent(convertFromRaw(JSON.parse(res.content)))
      );
      setLoading(false);
    };
    getPost();
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

  const submit = async () => {
    try {
      const data = new FormData();
      const editorJSON = JSON.stringify(
        convertToRaw(editorState.getCurrentContent())
      );
      data.append("title", form.title);
      data.append("subtitle", form.subtitle);
      data.append("image_banner", form.img);
      data.append("content", editorJSON);
      const res = await API.patch(`/posts/${location.state.id}`, true, data);

      MySwal.fire({
        title: <p>Update Successful!</p>,
        icon: "success",
        showConfirmButton: true,
        onClose: () => {
          history.push({
            pathname: `/blog/posts/${res.title.replace(/\s/g, "-")}`,
            state: { id: res._id }
          });
        }
      });
    } catch (e) {
      MySwal.fire({
        title: <p>Update Failed!</p>,
        icon: "error",
        showConfirmButton: true
      });
    }
  };

  return (
    <>
      <NavBackground />
      {loading ? (
        <Spinner />
      ) : (
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
                  <Editor
                    editorState={editorState}
                    editorStateChange={setEditorState}
                  />
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
                    Suggested size for the banner image is 1366 x 768 and
                    Maximum size of 2MB
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
      )}
    </>
  );
};

export default AddPost;
