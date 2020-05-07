import React from "react";
import { Editor } from "react-draft-wysiwyg";
import API from "../../util/fetchAPI.util";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const EditorComponent = ({ editorState, editorStateChange }) => {
  async function uploadImageCallBack(file) {
    try {
      const data = new FormData(); // eslint-disable-line no-undef
      data.append("image", file);
      const res = await API.create("/upload/article", false, data);
      return res;
    } catch (e) {
      console.log(e);
      return e;
    }
  }
  const editor = React.useRef(null);

  return (
    <>
      <Editor
        ref={editor}
        editorState={editorState}
        onEditorStateChange={(editorState) => editorStateChange(editorState)}
        toolbar={{
          image: {
            name: "article_img",
            uploadCallback: uploadImageCallBack,
            previewImage: true,
            alt: { present: true, mandatory: false },
            inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg"
          }
        }}
      />
    </>
  );
};

export default EditorComponent;
