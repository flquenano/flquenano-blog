import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import ContentItem from "./content-item/content-item.component";
// import Header from "./components/header/header.component";
import API from "../../util/fetchAPI.util";
import Spinner from "../spinner/spinner.component";

import "./_content.scss";

const Content = () => {
  const [postCnt, setPostCnt] = useState(1);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAll = async () => {
      const res = await API.get(`/article?page=${postCnt}`, false);
      if (res.data.articles.length < 1) {
        setLoading(false);
        return;
      }
      setArticles(res.data.articles);
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
      <div
        style={{ width: "100%", height: "58px", backgroundColor: "#0085a1" }}
      ></div>
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
              {articles.map((article, idx) => (
                <ContentItem
                  key={idx}
                  link={{
                    pathname: `article/${article.title.replace(/\s/g, "-")}`,
                    state: { id: article._id }
                  }}
                  title={article.title}
                  subTitle={article.subtitle}
                  postMeta={article.date_added}
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
