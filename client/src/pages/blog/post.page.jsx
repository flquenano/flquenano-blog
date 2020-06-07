import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import draftToHTML from "draftjs-to-html";

//Redux
import { useSelector, useDispatch } from "react-redux";
import {
  createLoadingSelector,
  createErrorMessageSelector
} from "../../redux/api/selector";
import { getPostStart } from "../../redux/post/post.actions";

import SpinnerLoader from "../../components/spinner/spinner.component";
import Post from "../../components/post/post.component";

const PostComponent = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const postId = () => {
    const link = location.pathname.split("/");
    const post = link[3].split("-");
    const id = post[post.length - 1];
    return id;
  };

  const loadingSelector = createLoadingSelector(["GET_POST"]);
  const errorSelector = createErrorMessageSelector(["GET_POST"]);

  const state = useSelector((state) => ({
    post: state.post,
    isLoading: loadingSelector(state),
    isError: errorSelector(state)
  }));

  useEffect(() => {
    dispatch(getPostStart(postId()));
  }, []);

  const convertImages = (draft) => {
    let htmlText = draftToHTML(JSON.parse(draft));
    const regex = /<div\s[^>]*?style\s*=\s*['\"]text-align:none([^'\"]*?)['\"][^>]*?>/g;
    const newHtml = htmlText.replace(
      regex,
      '<div style="text-align: center;">'
    );
    return newHtml;
  };

  const markup = () => ({
    __html: `<div>${convertImages(state.post.post.content)} </div>`
  });

  const display = (
    <article>
      {state.isLoading ? (
        <SpinnerLoader />
      ) : (
        <Post
          post={state.post.post}
          content={!state.post.post.content ? null : markup()}
        />
      )}
    </article>
  );

  return <>{state.isError ? <h1>{state.isError}</h1> : display}</>;
};

export default PostComponent;
