import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

//redux
import {
  createErrorMessageSelector,
  createLoadingSelector
} from "../../redux/api/selector";
import { getPostsStart } from "../../redux/post/post.actions";

//components
import ContentItem from "./content-item/content-item.component";
import API from "../../util/fetchAPI.util";
import Spinner from "../spinner/spinner.component";
import Header from "../header/header.component";

import "./_content.scss";

const Content = ({ changePage, page }) => {
  const post = useSelector((state) => ({
    posts: state.post.posts,
    count: state.post.count
  }));

  const [header, setHeader] = useState({});
  const [posts, setPosts] = useState([]);

  const [showGetOlder, setShowGetOlder] = useState(true);
  const [showGetNewer, setShowGetNewer] = useState(false);

  useEffect(() => {
    if (post.count === 0) return;
    if (page * 5 - 5 + post.posts.length == post.count) {
      setShowGetOlder(false);
    } else {
      setShowGetOlder(true);
    }

    if (page === 1) {
      setShowGetNewer(false);
    } else {
      setShowGetNewer(true);
    }
    setHeader(post.posts[0]);
    setPosts(post.posts);
    window.scrollTo(0, 0);
  }, [post]);

  const getOlderBtn = () => (
    <Button className="float-right" onClick={() => changePage(page + 1)}>
      Older Posts &rarr;
    </Button>
  );

  const getNewerBtn = () => (
    <Button
      className="float-right"
      style={{ marginRight: "5px" }}
      onClick={() => changePage(page - 1)}
    >
      &larr; Newer Posts
    </Button>
  );

  const showPosts = posts
    .slice(1)
    .map((post, idx) => <ContentItem key={idx} post={post} />);

  return (
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
  );
};

export default Content;
