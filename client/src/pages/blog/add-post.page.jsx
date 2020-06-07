import React, { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  createLoadingSelector,
  createErrorMessageSelector
} from "../../redux/api/selector";
import { addPostStart } from "../../redux/post/post.actions";

import { NavBackground } from "../../components/navigation/nav.background";
import AddPost from "../../components/add-post/add-post.component";
import Spinner from "../../components/spinner/spinner.component";

const AddPostPage = () => {
  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();
  const loadingSelector = createLoadingSelector(["ADD_POST"]);
  const errorSelector = createErrorMessageSelector(["ADD_POST"]);
  const state = useSelector((state) => ({
    isLoading: loadingSelector(state)
  }));

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    content: "",
    img: ""
  });

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
      dispatch(addPostStart({ body: data }));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <NavBackground />
      {state.isLoading ? (
        <Spinner />
      ) : (
        <AddPost
          form={form}
          userInput={userInput}
          editor={editorState}
          setEditor={setEditorState}
          validated={validated}
          submit={submit}
          fileInput={fileInput}
        />
      )}
    </>
  );
};

export default AddPostPage;
