import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import "./_footer.scss";

const FooterComponent = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col lg={8} md={10} className="mx-auto">
            <ul className="list-inline text-center">
              <li className="list-inline-item">
                <a href="#">
                  <FontAwesomeIcon icon={faGithub} size="3x" />
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#">
                  <FontAwesomeIcon icon={faLinkedin} size="3x" />
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#">
                  <FontAwesomeIcon icon={faEnvelope} size="3x" />
                </a>
              </li>
            </ul>
            <p className="copyright text-muted">
              Copyright &copy; FLQuenano 2020
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default FooterComponent;
