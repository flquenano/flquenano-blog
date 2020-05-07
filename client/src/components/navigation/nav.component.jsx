import React, { useState, useEffect } from "react";
import "./navigation.scss";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  let MinWidth = 992;
  let previousTop = 0;

  const [cssClasses, setCssClasses] = useState({
    isVisible: true,
    isFixed: true
  });

  useEffect(() => {
    window.addEventListener("scroll", scrollListener); // eslint-disable-next-line
  }, []);

  const scrollListener = function () {
    const headerHeight = document.getElementById("mainNav").offsetHeight;
    let currentTop = window.scrollY;

    if (MinWidth < window.innerWidth) {
      //check if user is scrolling up
      if (currentTop < previousTop) {
        console.log("Scroll Up");
        //if scrolling up...
        if (currentTop > 0 && cssClasses.isFixed) {
          setCssClasses({
            ...cssClasses,
            isVisible: true
          });
        } else {
          setCssClasses({
            isVisible: false,
            isFixed: false
          });
        }
      } else if (currentTop > previousTop) {
        setCssClasses({
          ...cssClasses,
          isVisible: false
        });
        if (currentTop > headerHeight && !cssClasses.isFixed) {
          setCssClasses({
            ...cssClasses,
            isFixed: true
          });
        }
      }
      previousTop = currentTop;
    }
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        variant="light"
        id="mainNav"
        fixed="top"
        className={` ${cssClasses.isFixed ? "is-fixed" : ""} ${
          cssClasses.isVisible ? "is-visible" : ""
        } bottom-shadow`}
      >
        <Container>
          <Navbar.Toggle
            className="navbar-toggler navbar-toggler-right"
            aria-controls="responsive-navbar-nav"
          />
          <Navbar.Collapse
            className="justify-content-center navbar-nav"
            id="navbarResponsive"
          >
            <Nav.Link as={Link} to="/" className="nav-item nav-link">
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/article/create"
              className="nav-item nav-link"
            >
              Projects
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/article/5eb34f134c644850943ee6c9"
              className="nav-item nav-link"
            >
              Blog
            </Nav.Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavigationBar;
