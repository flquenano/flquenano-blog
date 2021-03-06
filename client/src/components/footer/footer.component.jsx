import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

import FooterItem from "./footer-item.component";

import "./_footer.scss";

const FooterComponent = () => {
  const icons = [
    { icon: faGithub, link: "https://github.com/flquenano" },
    {
      icon: faLinkedin,
      link: "https://www.linkedin.com/in/flquenano/"
    },
    { icon: faEnvelope, link: "mailto:flquenano@gmail.com" }
  ];

  return (
    <footer as={Container}>
      <Row>
        <Col lg={8} md={12} className="mx-auto">
          <ul className="list-inline text-center list-icon">
            {icons.map((el, idx) => (
              <FooterItem key={idx} icon={el.icon} link={el.link} />
            ))}
          </ul>
          <p className="copyright text-muted">
            Copyright &copy; FLQuenano 2020
          </p>
        </Col>
      </Row>
    </footer>
  );
};

export default FooterComponent;
