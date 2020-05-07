import React from "react";
import { Editor } from "react-draft-wysiwyg";
import API from "../../util/fetchAPI.util";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const EditorComponent = ({ editorState }) => {
  return (
    <>
      <Editor editorState={editorState} readOnly={true} />
    </>
  );
};

export default EditorComponent;
