import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./header.scss";

const HeaderComponent = ({ url, title, subTitle }) => {
  const bgImg = {
    backgroundImage: `url("http://localhost:5000/uploads/${url}")`
  };
  return (
    <>
      <header className="masthead" style={bgImg}>
        <div className="overlay"></div>
        <Container>
          <Row>
            <Col lg={8} md={10} className="mx-auto">
              <div className="page-heading">
                <h1>{title}</h1>
                <span className="subheading">{subTitle}</span>
              </div>
            </Col>
          </Row>
        </Container>
      </header>
    </>
  );
};

export default HeaderComponent;
