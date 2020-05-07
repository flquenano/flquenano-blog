import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ContentItem from "./content-item/content-item.component";

import "./_content.scss";

const Content = () => {
  const posts = [
    {
      link: "/post/:id",
      title: "Title 1",
      subTitle: "Problems look mighty small from 150 miles up",
      postMeta: "Posted by Start Bootstrap on September 24, 2019"
    },
    {
      link: "/post/:id",
      title: "Title 2",
      subTitle: "Problems look mighty small from 150 miles up",
      postMeta: "Posted by Start Bootstrap on September 24, 2019"
    },
    {
      link: "/post/:id",
      title: "Title 3",
      subTitle: "Problems look mighty small from 150 miles up",
      postMeta: "Posted by Start Bootstrap on September 24, 2019"
    }
  ];
  return (
    <Container>
      <Row>
        <Col lg={8} md={10} className="mx-auto">
          {posts.map((post, idx) => (
            <ContentItem
              key={idx}
              link={post.link}
              title={post.title}
              subTitle={post.subTitle}
              postMeta={post.postMeta}
            />
          ))}
          <div className="clearfix">
            <a className="btn btn-primary float-right" href="#">
              Older Posts &rarr;
            </a>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Content;
