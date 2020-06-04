import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import bsCustomFileInput from "bs-custom-file-input";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { createLoadingSelector } from "../../redux/api/selector";
import { editPostStart, getPostStart } from "../../redux/post/post.actions";

import EditPost from "../../components/edit-post/edit-post.component";
import Spinner from "../../components/spinner/spinner.component";

const EditPostContainer = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const loadingSelector = createLoadingSelector(["GET_POST", "EDIT_POST"]);
  const state = useSelector((state) => ({
    post: state.post,
    isLoading: loadingSelector(state.loading)
  }));

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    content: "",
    img: {
      name: "Image Banner"
    }
  });

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const postId = () => {
    const link = location.pathname.split("/");
    const post = link[4].split("-");
    const id = post[post.length - 1];
    return id;
  };

  //Sets Content of Editor
  useEffect(() => {
    if (Object.keys(state.post.post).length) {
      setForm({
        ...form,
        title: state.post.post.title,
        subtitle: state.post.post.subtitle
      });
      setEditorState(
        EditorState.createWithContent(
          convertFromRaw(JSON.parse(state.post.post.content))
        )
      );
    }
  }, [state.post.post]);

  //didMount
  useEffect(() => {
    bsCustomFileInput.init();
    dispatch(getPostStart(postId()));
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
      dispatch(editPostStart({ id: postId(), body: data }));
    } catch (e) {
      console.log(e); // replace with alert
    }
  };

  return (
    <>
      {state.isLoading ? (
        <Spinner />
      ) : (
        <EditPost
          form={form}
          editor={editorState}
          setEditor={setEditorState}
          userInput={userInput}
          fileInput={fileInput}
          submit={submit}
        />
      )}
    </>
  );
};

export default EditPostContainer;
