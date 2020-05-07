import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import {
  EditorState,
  ContentState,
  convertToRaw,
  convertFromHTML
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import bsCustomFileInput from "bs-custom-file-input";

import API from "../../util/fetchAPI.util";

import "./add-post.css";

const AddPost = () => {
  const [form, setForm] = useState({
    title: "",
    content: "",
    tags: [],
    img: ""
  });

  //didMount
  useEffect(() => {
    bsCustomFileInput.init();
  }, []);

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const editor = useRef(null);
  function focusEditor() {
    editor.current.focus();
  }
  // useEffect(() => {
  //   const html = editorState.getCurrentContent();
  //   const contentBlock = htmlToDraft();
  //   if (contentBlock) {
  //     const contentData = ContentState.createFromBlockArray(
  //       contentBlock.contentBlocks
  //     );
  //     const editorData = EditorState.createWithContent(contentData);
  //     setEditorState(editorData);
  //   }
  // }, []);

  const userInput = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  const fileInput = async (event) => {
    setForm({ ...form, img: event.target.files[0] });
  };

  async function uploadImageCallBack(file) {
    try {
      const data = new FormData(); // eslint-disable-line no-undef
      data.append("image", file);
      const res = await API.create("/upload/article", data);
      return res;
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  const submit = () => {
    console.log(JSON.stringify(editorState.getCurrentContent()));
    // const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
    // const value = blocks
    //   .map((block) => (!block.text.trim() && "\n") || block.text)
    //   .join("\n");
    const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    const draft = htmlToDraft(html);
    console.log(JSON.stringify(convertFromHTML(html), null, 4));
  };

  return (
    <Container style={{ top: "200px" }}>
      <Row>
        <Col lg={8} md={10} className="mx-auto">
          <Form>
            <Form.Group controlId="post_title">
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
                onClick={focusEditor}
                ref={editor}
                initialEditorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={(editorState) =>
                  setEditorState(editorState)
                }
                style={{ height: "300px" }}
                toolbar={{
                  image: {
                    name: "article_img",
                    uploadCallback: uploadImageCallBack,
                    previewImage: true,
                    alt: { present: true, mandatory: false },
                    inputAccept:
                      "image/gif,image/jpeg,image/jpg,image/png,image/svg"
                  }
                }}
              />

              <textarea
                disabled
                value={draftToHtml(
                  convertToRaw(editorState.getCurrentContent())
                )}
                style={{ width: "100%", height: "300px" }}
              />
            </Form.Group>
            <Form.Group>
              <Form.File
                id="custom-file"
                label="Image Banner"
                custom
                as="file"
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
