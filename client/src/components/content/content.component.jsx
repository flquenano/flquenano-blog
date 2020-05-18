import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

import ContentItem from "./content-item/content-item.component";
import API from "../../util/fetchAPI.util";
import Spinner from "../spinner/spinner.component";
import { NavBackground } from "../navigation/nav.background";

import "./_content.scss";

const Content = () => {
  const [pageCtr, setPageCtr] = useState(1);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showGetOlder, setShowGetOlder] = useState(true);
  const [showGetNewer, setShowGetNewer] = useState(false);
  useEffect(() => {
    const getAll = async () => {
      const res = await API.get(`/posts?page=${pageCtr}&sort`, false);

      if (pageCtr * 5 - 5 + res.data.posts.length == res.data.count) {
        setShowGetOlder(false);
      } else {
        setShowGetOlder(true);
      }

      if (pageCtr === 1) {
        setShowGetNewer(false);
      } else {
        setShowGetNewer(true);
      }
      setPosts(res.data.posts);
      setLoading(false);
    };

    getAll();
  }, [pageCtr]);

  const getOlder = () => {
    setLoading(true);
    setPageCtr(pageCtr + 1);
  };

  const getNewer = () => {
    setLoading(true);
    setPageCtr(pageCtr - 1);
  };

  const getOlderBtn = () => (
    <Button className="float-right" onClick={getOlder}>
      Older Posts &rarr;
    </Button>
  );

  const getNewerBtn = () => (
    <Button
      className="float-right"
      style={{ marginRight: "5px" }}
      onClick={getNewer}
    >
      &larr; Newer Posts
    </Button>
  );

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
              style={{ minHeight: "80vh", margin: "50px 0" }}
            >
              {posts.map((post, idx) => (
                <ContentItem key={idx} post={post} />
              ))}

              <div className="clearfix">
                {showGetOlder ? getOlderBtn() : null}
                {showGetNewer ? getNewerBtn() : null}
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default Content;
