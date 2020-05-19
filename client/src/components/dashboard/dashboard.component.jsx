import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Container, Row, Col, Table, Button, Form } from "react-bootstrap";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import THead from "./table/th.component";
import TData from "./table/td.component";

import API from "../../util/fetchAPI.util";
import authContext from "../../context/store";
import Spinner from "../spinner/spinner.component";
import { NavBackground } from "../navigation/nav.background";

import "./dashboard.scss";

//Consume Context for Name Display
const Dashboard = () => {
  const history = useHistory();
  const swal = withReactContent(Swal);
  const [{ isLoggedIn }, dispatch] = useContext(authContext);
  const [loading, setLoading] = useState(true);
  const [delPost, setDeletePost] = useState(1);
  const [posts, setPosts] = useState({});
  const theadLabels = ["Title", "Date Added", "Options"];

  useEffect(() => {
    if (Cookies.get("token") === undefined) {
      return history.push("/blog/login");
    } else {
      dispatch({ type: "LOGIN", payload: { name: Cookies.get("name") } });
    }
    setLoading(true);
    const getAll = async () => {
      const res = await API.get(`/posts/my-posts`, true);
      if (res.code === 401) {
        return sessionExpired();
      }
      setPosts(res.data.posts);
      setLoading(false);
    };
    getAll();
  }, [delPost]);

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
          const deletePost = async () => {
            const res = await API.remove(`/posts/${id}`, true);
            if (res.status === "success") {
              setDeletePost(delPost + 1);
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            } else {
              Swal.fire(
                "Post not Deleted!",
                "Your file has not been deleted.",
                "error"
              );
            }
          };
          deletePost();
        }
      });
  };

  const myPosts = () =>
    posts.map((post, idx) => (
      <TData key={idx} post={post} remove={deletePost} />
    ));

  return (
    <>
      <NavBackground />
      {loading ? (
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
