import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import draftToHTML from "draftjs-to-html";
import API from "../../util/fetchAPI.util";

import Header from "../header/header.component";
import SpinnerLoader from "../spinner/spinner.component";

import "./_post.scss";

const PostComponent = () => {
  // const { id } = useParams();
  const location = useLocation();
  const id = location.state.id;
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState({});

  useEffect(() => {
    const fetchArticle = async () => {
      const res = await API.get(`/article/${id}`, false);
      setArticle(res);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };
    fetchArticle();
  }, [id]);

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
    __html: `<div>${convertImages(article.content)} </div>`
  });

  return (
    <>
      <article>
        {loading ? (
          <SpinnerLoader />
        ) : (
          <>
            <Header
              url={`banner/${article.image_banner}`}
              title={article.title}
              subTitle={article.subtitle}
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
