import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

import ContentItem from "./content-item/content-item.component";
import API from "../../util/fetchAPI.util";
import Spinner from "../spinner/spinner.component";
import { NavBackground } from "../navigation/nav.background";

import "./_content.scss";

const Content = () => {
  const [postCnt, setPostCnt] = useState(1);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(<NavBackground />);
    const getAll = async () => {
      const res = await API.get(`/posts?page=${postCnt}`, false);
      if (res.data.posts.length < 1) {
        setLoading(false);
        return;
      }
      setPosts(res.data.posts);
      setLoading(false);
    };

    getAll();
  }, [postCnt]);

  const getOlder = () => {
    setLoading(true);
    setPostCnt(postCnt + 1);
  };

  const getNewer = () => {
    setLoading(true);
    setPostCnt(postCnt - 1);
  };

  return (
    <>
      <NavBackground />
      {loading ? (
        <Spinner />
      ) : (
        <Container>
          <br />
          <Row>
            <Col
              lg={8}
              md={10}
              className="mx-auto"
              style={{ minHeight: "80vh" }}
            >
              {posts.map((post, idx) => (
                <ContentItem
                  key={idx}
                  link={{
                    pathname: `posts/${post.title.replace(/\s/g, "-")}`,
                    state: { id: post._id }
                  }}
                  title={post.title}
                  subTitle={post.subtitle}
                  postMeta={post.date_added}
                />
              ))}
              <div className="clearfix">
                {false ? (
                  ""
                ) : (
                  <Button className="float-right" onClick={getOlder}>
                    Older Posts &rarr;
                  </Button>
                )}
                {postCnt === 1 ? (
                  ""
                ) : (
                  <Button
                    className="float-right"
                    style={{ marginRight: "5px" }}
                    onClick={getNewer}
                  >
                    &larr; Newer Posts
                  </Button>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default Content;
