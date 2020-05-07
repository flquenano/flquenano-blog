import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { EditorState, convertToRaw } from "draft-js";
import bsCustomFileInput from "bs-custom-file-input";
import API from "../../util/fetchAPI.util";

import Editor from "../editor/editor.component";

import "./add-post.css";

const AddPost = () => {
  const [form, setForm] = useState({
    title: "",
    content: "",
    tags: [],
    img: ""
  });
  const [editorState, setEditorState] = useState(
    // EditorState.createWithContent(convertFromRaw(content))
    EditorState.createEmpty()
  );

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

  const submit = async () => {
    try {
      const data = new FormData();
      const editorJSON = JSON.stringify(
        convertToRaw(editorState.getCurrentContent())
      );
      data.append("title", form.title);
      data.append("image_banner", form.img);
      data.append("content", editorJSON);

      const res = await API.create("/article", true, data);
      console.log(res);
    } catch (e) {
      console.log(e);
    }

    // const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
    // const value = blocks
    //   .map((block) => (!block.text.trim() && "\n") || block.text)
    //   .join("\n");
    // const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    // const draft = htmlToDraft(html);
    // console.log(JSON.stringify(convertFromHTML(html), null, 4));
  };

  return (
    <Container style={{ top: "200px" }}>
      <Row>
        <Col lg={8} md={10} className="mx-auto">
          <Form>
            <Form.Group controlId="post_title" style={{ margin: "30px 0px" }}>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title"
                onChange={userInput}
                name="title"
              />
            </Form.Group>
            <Form.Group controlId="post_content">
              <Editor
                editorState={editorState}
                editorStateChange={setEditorState}
              />
              {/* <textarea
                disabled
                value={draftToHtml(
                  convertToRaw(editorState.getCurrentContent())
                )}
                style={{ width: "100%", height: "300px" }}
              /> */}
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

            <Form.Group>
              <Button
                style={{ float: "right", marginTop: "20px" }}
                onClick={submit}
              >
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

/*
div.DraftEditor-root {
  border: 1px solid #000;
  background-color: beige;
  height: 200px;
  width: 300px;
  overflow-y: auto;
}
div.DraftEditor-editorContainer,
div.public-DraftEditor-content {
  height: 100%;
}

image: {
  uploadCallback: uploadImageCallBack,
  previewImage: true,
  alt: { present: true, mandatory: false },
  inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
}

*/
