import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import draftToHTML from "draftjs-to-html";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import API from "../../util/fetchAPI.util";
import { stateToHTML } from "draft-js-export-html";

import Editor from "../editor/editor-display.component";
import Header from "../header/header.component";
import SpinnerLoader from "../spinner/spinner.component";

import "./_post.scss";

const PostComponent = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState({});

  useEffect(() => {
    const fetchArticle = async () => {
      const res = await API.get(`/article/${id}`, false);
      setArticle(res);
      setTimeout(() => {
        setLoading(false);
      }, 7000);
    };
    fetchArticle();
  }, [id]);

  const markup = () => ({
    __html: `<div>${draftToHTML(JSON.parse(article.content))} </div>`
  });

  return (
    <>
      <article>
        {loading ? (
          <SpinnerLoader />
        ) : (
          <>
            <Header />
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
