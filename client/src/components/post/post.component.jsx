import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import draftToHTML from "draftjs-to-html";
import API from "../../util/fetchAPI.util";

import Header from "../header/header.component";
import SpinnerLoader from "../spinner/spinner.component";

import "./_post.scss";

const PostComponent = () => {
  const location = useLocation();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState({});

  useEffect(() => {
    const fetchPost = async () => {
      if (location.state === undefined) {
        return history.push("/blog/404");
      }
      const res = await API.get(`/posts/${location.state.id}`, false);
      setPost(res);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };
    fetchPost();
  }, []);

  //Centers Image
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
    __html: `<div>${convertImages(post.content)} </div>`
  });

  return (
    <>
      <article>
        {loading ? (
          <SpinnerLoader />
        ) : (
          <>
            <Header
              url={`banner/${post.image_banner}`}
              title={post.title}
              subTitle={post.subtitle}
            />
            <Container>
              <Row>
                <Col lg={8} md={10} className="mx-auto">
                  {" "}
                  <div
                    className="article"
                    dangerouslySetInnerHTML={markup()}
                  ></div>
                </Col>
              </Row>
            </Container>
          </>
        )}
      </article>
    </>
  );
};

export default PostComponent;
