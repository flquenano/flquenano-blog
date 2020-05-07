import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./header.scss";

const HeaderComponent = () => {
  const bgImg = {
    backgroundImage: "url('http://localhost:5000/uploads/banner/home-bg.jpg')"
  };
  return (
    <>
      <header className="masthead" style={bgImg}>
        <div className="overlay"></div>
        <Container>
          <Row>
            <Col lg={8} md={10} className="mx-auto">
              <div className="page-heading">
                <h1>About Me</h1>
                <span className="subheading">This is what I do.</span>
              </div>
            </Col>
          </Row>
        </Container>
      </header>
    </>
  );
};

export default HeaderComponent;
