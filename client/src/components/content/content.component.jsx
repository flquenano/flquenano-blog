import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ContentItem from "./content-item/content-item.component";
import API from "../../util/fetchAPI.util";
import Spinner from "../spinner/spinner.component";
import Header from "../header/header.component";
import { NavBackground } from "../navigation/nav.background";

import "./_content.scss";

const Content = () => {
  const [pageCtr, setPageCtr] = useState(1);
  const [posts, setPosts] = useState([]);
  const [header, setHeader] = useState({});
  const [loading, setLoading] = useState(true);
  const [showGetOlder, setShowGetOlder] = useState(true);
  const [showGetNewer, setShowGetNewer] = useState(false);

  useEffect(() => {
    const getAll = async () => {
      const res = await API.get(`/posts?page=${pageCtr}&sort`, false);
      console.log(res.data.count === 0);

      if (res.data.count === 0) {
        setLoading(false);
        return;
      }

      if (res.data.count === 0) {
        setLoading(false);
        return;
      }

      if (
        pageCtr * 5 - 5 + res.data.posts.length == res.data.count ||
        res.data.count < 6
      ) {
        setShowGetOlder(false);
      } else {
        setShowGetOlder(true);
      }

      if (pageCtr === 1) {
        setShowGetNewer(false);
      } else {
        setShowGetNewer(true);
      }
      setHeader(res.data.posts[0]);
      setPosts(res.data.posts);
      setLoading(false);
      window.scrollTo(0, 0);
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

  const showPosts = posts
    .slice(1)
    .map((post, idx) => <ContentItem key={idx} post={post} />);

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
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Header
            title={
              <Link
                className="header-link"
                to={{
                  pathname: `/blog/posts/${header.title}`,
                  state: { id: header._id }
                }}
              >
                {header.title}
              </Link>
            }
            subTitle={header.subtitle}
            url={header.image_banner}
          />
          <Container style={{ marginBottom: "75px" }}>
            <br />
            <Row>
              <Col
                lg={10}
                md={12}
                className="mx-auto"
                style={{ minHeight: "30vh", marginBottom: "30px 0" }}
              >
                {showPosts}

                <div className="clearfix">
                  {showGetOlder ? getOlderBtn() : null}
                  {showGetNewer ? getNewerBtn() : null}
                </div>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
};

export default Content;
