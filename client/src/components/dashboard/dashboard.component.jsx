import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Table, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import THead from "./table/th.component";
import TData from "./table/td.component";

import API from "../../util/fetchAPI.util";
import Spinner from "../spinner/spinner.component";
import { NavBackground } from "../navigation/nav.background";

import "./dashboard.scss";

const Dashboard = () => {
  const swal = withReactContent(Swal);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [delPost, setDeletePost] = useState(1);
  const [posts, setPosts] = useState({});
  const theadLabels = ["Title", "Date Added", "Options"];

  useEffect(() => {
    setLoading(true);
    const getAll = async () => {
      const res = await API.get(`/posts`, true);
      setPosts(res.data.posts);
      setLoading(false);
    };
    getAll();
  }, [delPost, title]);

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

  return (
    <>
      <NavBackground />
      {loading ? (
        <Spinner />
      ) : (
        <Container className="dashboard" style={{ minHeight: "70vh" }}>
          <br />
          <br />

          <Row>
            <Col>
              <div
                style={{
                  minHeight: "400px",
                  height: "400px",
                  width: "100%",
                  overflow: "auto"
                }}
              >
                <Table
                  bordered
                  striped
                  style={{
                    height: "400px"
                  }}
                >
                  <thead>
                    <tr as={Row}>
                      {theadLabels.map((th, idx) => (
                        <THead key={idx} content={th} />
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map((post, idx) => {
                      console.log(post);
                      return (
                        <TData key={idx} post={post} remove={deletePost} />
                      );
                    })}
                  </tbody>
                </Table>
              </div>

              <Button
                as={Link}
                to="/posts/create"
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
