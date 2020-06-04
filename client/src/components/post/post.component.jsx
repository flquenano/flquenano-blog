import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import Header from "../header/header.component";

import "./_post.scss";

const PostComponent = ({ post, content }) => {
  return (
    <>
      <Header
        url={post.image_banner}
        title={post.title}
        subTitle={post.subtitle}
      />
      <Container>
        <Row
          style={{
            background: "#fff",
            padding: "50px 0",
            boxShadow:
              "-10px 0 8px -8px rgba(0,0,0,0.5), 10px 0 8px -8px rgba(0,0,0,0.5)"
          }}
        >
          <Col lg={8} md={10} className="mx-auto">
            {" "}
            <div
              className="article"
              dangerouslySetInnerHTML={content}
              style={{ marginBottom: "40px" }}
            ></div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PostComponent;
