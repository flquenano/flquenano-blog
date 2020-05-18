import React from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Card,
  Button,
  ButtonGroup
} from "react-bootstrap";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./home.scss";
const HomePage = () => {
  const scrollDown = () => {
    const height = window.screen.height - window.screen.height * 0.1;
    window.scroll({ top: height, left: 0, behavior: "smooth" });
  };
  return (
    <>
      <div id="landing">
        <div className="overlay"></div>
        <Container>
          <Row>
            <Col lg={8} md={12} className="mx-auto my-auto">
              <div className="page-heading">
                <h1>Hi there, I'm Francis!</h1>
                <span className="subheading">Welcome to my Page!</span>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <div className="btn-container">
                <div className="scroll-down" onClick={() => scrollDown()}>
                  <FontAwesomeIcon icon={faAngleDown} size="3x" />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Container id="homepage">
        <Row className="about-me">
          <Col sm={12} md={6}>
            <Container className="p-3">
              <Row>
                <Col xs={12} sm={4} md={5}>
                  <Image
                    src="http://localhost:5000/uploads/images/65965925290be8da4cf15827e3df6428f83c.jpg"
                    rounded
                    style={{
                      width: "150px",
                      height: "150px",
                      margin: "20px 0"
                    }}
                  />
                </Col>
                <Col xs={12} sm={8} md={7}>
                  <div className="my-info">
                    <p>
                      <span className="title">Name: </span>
                      <span>Francis Queñano</span>
                    </p>
                    <p>
                      <span className="title">Profile: </span>
                      <span>Software Engineer</span>
                    </p>
                    <p>
                      <span className="title">Email: </span>
                      <span>flquenano@gmail.com</span>
                    </p>
                    <p>
                      <span className="title">Phone: </span>
                      <span>(504)266-9417</span>
                    </p>
                  </div>
                  <Row>
                    <Col>
                      <Button
                        style={{
                          fontSize: "12px",
                          width: "auto",
                          padding: "5px 7px",
                          marginRight: "2px"
                        }}
                      >
                        Resume
                      </Button>

                      {/* <Button
                        style={{
                          fontSize: "12px",
                          width: "auto",
                          padding: "5px 7px",
                          marginRight: "2px"
                        }}
                      >
                        My Grades
                      </Button> */}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>

            <Container>
              <Row className="my-skills">
                <Col md={12}>
                  <span className="h3">My Skills</span>
                  <ul style={{ fontSize: "1.2rem" }}>
                    <li style={{ margin: "5% 0" }}>
                      Programming/Languages
                      <ul style={{ columns: "2" }}>
                        <li>Javascript</li>
                        <li>ReactJS</li>
                        <li>NodeJS</li>
                        <li>HTML & (S)CSS</li>
                      </ul>
                    </li>
                    <li style={{ margin: "5% 0" }}>
                      Database
                      <ul style={{ columns: "2" }}>
                        <li>MongoDB</li>
                        <li>MySQL</li>
                      </ul>
                    </li>
                  </ul>
                </Col>
              </Row>
            </Container>
          </Col>
          <Col sm={12} md={6} style={{ marginBottom: "30px" }}>
            <Container className="p-3">
              <Row>
                <Col sm={12}>
                  <h1>About Me</h1>
                </Col>
              </Row>
            </Container>
            <Container>
              <Row className="p1">
                <Col sm={12} md={12}>
                  <p className="lead">
                    Hello I'm Francis Luigie Quenano. I'm originally from the
                    Philippines and now currently residing in Terrytown,
                    Louisiana.
                  </p>
                  <p className="lead">
                    I graduated from&nbsp;
                    <a href="https://www.adamson.edu.ph/v1/" target="_blank">
                      Adamson University
                    </a>
                    &nbsp;in the Philippines with a degree in&nbsp;
                    <a
                      href="https://www.adamson.edu.ph/v1/?page=curriculum&cid=%20%20%20%203r&curryear=2013"
                      target="_blank"
                    >
                      B.S. in Information Technology
                    </a>{" "}
                    specializing in web-based and desktop application
                    development. &nbsp;
                  </p>
                  <p className="lead">
                    Recently I have been improving my skills in ReactJS and
                    NodeJS with MongoDB as my database ang git for version
                    control.
                  </p>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <Row>
              <h1>Projects</h1>
            </Row>
            <Row style={{ margin: "50px 20px" }}>
              <Col md={4} style={{ margin: "10px 0" }}>
                <Card style={{ width: "100%", height: "350px" }}>
                  <Card.Img variant="top" src="holder.js/100px180" />
                  <Card.Body>
                    <Card.Title>Blog</Card.Title>
                    <Card.Text>
                      <b>[Still in Development]</b>
                      <br />
                      Built with ReactJS, NodeJS and MongoDB with Clean Blog as
                      template.
                    </Card.Text>
                    <Row className="text-center">
                      <Col md={12}>
                        <ButtonGroup>
                          <Button
                            variant="primary"
                            style={{ marginLeft: "2px" }}
                          >
                            Demo
                          </Button>
                          <Button
                            variant="primary"
                            style={{ marginLeft: "2px" }}
                          >
                            Code
                          </Button>
                        </ButtonGroup>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
/**
 * Landing
 * About Me
 * Projects
 *
 */
