import React, { useState, useEffect, useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Table, Button, Form } from "react-bootstrap";

//Redux
import { createLoadingSelector } from "../../redux/api/selector";
import {
  getMyPostsStart,
  removePostStart
} from "../../redux/post/post.actions";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import THead from "./table/th.component";
import TData from "./table/td.component";

import Spinner from "../spinner/spinner.component";
import { NavBackground } from "../navigation/nav.background";

import "./dashboard.scss";

//Consume Context for Name Display
const Dashboard = () => {
  const dispatch = useDispatch();
  const loadingSelector = createLoadingSelector([
    "GET_MY_POSTS",
    "REMOVE_POST"
  ]);
  const data = useSelector((state) => ({
    isLoading: loadingSelector(state),
    post: state.post
  }));

  const history = useHistory();
  const swal = withReactContent(Swal);

  const theadLabels = ["Title", "Date Added", "Options"];

  useEffect(() => {
    dispatch(getMyPostsStart());
  }, []);

  const sessionExpired = () =>
    swal
      .fire({
        title: "Please Login Again!",
        icon: "warning",
        text: "",
        timer: 2000,
        showConfirmButton: false,
        allowOutsideClick: false
      })
      .then(() => {
        history.push("/blog/login");
      });

  const deletePost = (id, title) => {
    swal
      .fire({
        title: "Delete Post?",
        icon: "warning",
        text: `Title: ${title}`,
        showCancelButton: true,
        cancelButtonColor: "#dc3545",
        confirmButtonColor: "#28a745",
        confirmButtonText: "Yes, delete it!"
      })
      .then((result) => {
        if (result.value) {
          dispatch(removePostStart(id));
        }
      });
  };

  const myPosts = () =>
    data.post.posts.map((post, idx) => (
      <TData key={idx} post={post} remove={deletePost} />
    ));

  return (
    <>
      <NavBackground />
      {data.isLoading ? (
        <Spinner />
      ) : (
        <Container className="dashboard" style={{ minHeight: "80vh" }}>
          <br />
          <br />
          <Row>
            <Col>
              <div
                style={{
                  minHeight: "450px",
                  maxHeight: "450px",
                  width: "100%",
                  overflowY: "auto"
                }}
              >
                <Table
                  bordered
                  striped
                  style={{
                    minHeight: "450px"
                  }}
                >
                  <thead>
                    <tr as={Row}>
                      {theadLabels.map((th, idx) => (
                        <THead key={idx} content={th} />
                      ))}
                    </tr>
                  </thead>
                  <tbody>{myPosts()}</tbody>
                </Table>
              </div>

              <Button
                as={Link}
                to="posts/create"
                style={{ float: "left", margin: "2rem 0" }}
              >
                Add posts
              </Button>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default Dashboard;
