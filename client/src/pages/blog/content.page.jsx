import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

//redux
import {
  createErrorMessageSelector,
  createLoadingSelector
} from "../../redux/api/selector";
import { getPostsStart, getPostCancel } from "../../redux/post/post.actions";

import Content from "../../components/content/content.component";
import Spinner from "../../components/spinner/spinner.component";

const ContentPage = () => {
  const dispatch = useDispatch();
  const loadingSelector = createLoadingSelector(["GET_POSTS"]);
  const errorSelector = createErrorMessageSelector(["GET_POSTS"]);
  const post = useSelector((state) => ({
    isLoading: loadingSelector(state),
    isError: errorSelector(state)
  }));

  const [pageCtr, setPageCtr] = useState(1);

  useEffect(() => {
    dispatch(getPostsStart(1));
    return () => {
      dispatch(getPostCancel());
    };
  }, []);

  const loadPosts = (page) => {
    if (page <= 0) return;
    setPageCtr(page);
    dispatch(getPostsStart(page));
  };

  return (
    <>
      {post.isLoading ? (
        <Spinner />
      ) : (
        <Content changePage={loadPosts} page={pageCtr} />
      )}
    </>
  );
};

export default ContentPage;
