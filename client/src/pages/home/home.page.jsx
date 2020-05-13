import React from "react";
import { Container, Row, Col, Image, Card, Button } from "react-bootstrap";
import Footer from "../../components/footer/footer.component";

import "./home.scss";
const HomePage = () => {
  return (
    <>
      <div
        style={{ width: "100%", height: "100vh", background: "black" }}
      ></div>
      <Container id="homepage">
        <Row style={{ padding: "4rem 0" }}>
          <Col sm={12}>
            <Row>
              <Col sm={12}>
                <h1>About Me</h1>
              </Col>
            </Row>
            <Row>
              <Col sm={6}>
                <Row>
                  <Col sm={6} md={5}>
                    <Image
                      src="http://localhost:5000/uploads/images/65965925290be8da4cf15827e3df6428f83c.jpg"
                      rounded
                      style={{ width: "150px", height: "150px" }}
                    />
                  </Col>
                  <Col sm={6} md={7}>
                    <p>
                      <span className="title">Name: </span>
                      <span>Francis Luigie C. Queñano</span>
                    </p>
                    <p>
                      <span className="title">Profile: </span>
                      <span>Junior Web Developer</span>
                    </p>
                    <p>
                      <span className="title">Email: </span>
                      <span>flquenano@gmail.com</span>
                    </p>
                    <p>
                      <span className="title">Phone: </span>
                      <span>(504)266-9417</span>
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <hr />
                    <h2>Skills</h2>
                    <p>
                      What is Lorem Ipsum? Lorem Ipsum is simply dummy text of
                      the printing and typesetting industry. Lorem Ipsum has
                      been the industry's standard dummy text ever since the
                      1500s, when an unknown printer took a galley of type and
                      scrambled it to make a type specimen book. It has survived
                      not only five centuries, but also the leap into electronic
                      typesetting, remaining essentially unchanged. It was
                      popularised in the 1960s with the release of Letraset
                      sheets containing Lorem Ipsum passages, and more
                    </p>
                  </Col>
                </Row>
              </Col>
              <Col sm={6}>
                What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
                printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a
                type specimen book. It has survived not only five centuries, but
                also the leap into electronic typesetting, remaining essentially
                unchanged. It was popularised in the 1960s with the release of
                Letraset sheets containing Lorem Ipsum passages, and more
                recently with desktop publishing software like Aldus PageMaker
                including versions of Lorem Ipsum. Why do we use it? It is a
                long established fact that a reader will be distracted by the
                readable content of a page when looking at its layout. The point
                of using Lorem Ipsum is that it has a more-or-less normal
                distribution of letters, as opposed to using 'Content here,
                content here', making it look like readable English. Many
                desktop publishing packages and web page editors now use Lorem
                Ipsum as their default model text, and a search for 'lorem
                ipsum' will uncover many web sites still in their infancy.
                Various versions have evolved over the years, sometimes by
                accident, sometimes on purpose (injected humour and the like).
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
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                          Some quick example text to build on the card title and
                          make up the bulk of the card's content.
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={4} style={{ margin: "10px 0" }}>
                    <Card style={{ width: "100%", height: "350px" }}>
                      <Card.Img variant="top" src="holder.js/100px180" />
                      <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                          Some quick example text to build on the card title and
                          make up the bulk of the card's content.
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={4} style={{ margin: "10px 0" }}>
                    <Card style={{ width: "100%", height: "350px" }}>
                      <Card.Img variant="top" src="holder.js/100px180" />
                      <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                          Some quick example text to build on the card title and
                          make up the bulk of the card's content.
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
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
