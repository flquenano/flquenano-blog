import React, { useEffect } from "react";
import "./navigation.scss";
import { Navbar, Nav, Container } from "react-bootstrap";

const NavigationBar = () => {
  let MinWidth = 992;
  let previousTop = 0;
  useEffect(() => {
    window.addEventListener("scroll", scrollListener); // eslint-disable-next-line
  }, []);

  const scrollListener = function () {
    // console.log({
    //   width: window.innerWidth,
    //   height: window.innerHeight,
    //   top: window.scrollY
    // });

    const headerHeight = window.innerHeight;
    let currentTop = window.scrollY;

    if (MinWidth < window.innerWidth) {
      //check if user is scrolling up
      if (currentTop < previousTop) {
        console.log("Scrolli Up");
        //if scrolling up...
        if (
          currentTop > 0 &&
          document.getElementById("mainNav").classList.contains("is-fixed")
        ) {
          document.getElementById("mainNav").classList.add("is-visible");
        } else {
          document
            .getElementById("mainNav")
            .classList.remove("is-visible", "is-fixed");
        }
      } else if (currentTop > previousTop) {
        //if scrolling down...
        document.getElementById("mainNav").classList.remove("is-visible");

        if (
          currentTop > headerHeight &&
          !document.getElementById("mainNav").classList.contains("is-fixed")
        ) {
          console.log({ currentTop, headerHeight });
          document.getElementById("mainNav").classList.add("is-fixed");
        }
      }
      previousTop = currentTop;
    }
  };
  // Show the navbar when the page is scrolled up
  // var MQL = 992;

  //primary navigation slide-in effect
  // if ($(window).width() > MQL) {
  //   var headerHeight = $("#mainNav").height();
  //   $(window).on(
  //     "scroll",
  //     {
  //       previousTop: 0
  //     },
  //     function () {
  //       var currentTop = $(window).scrollTop();
  //       //check if user is scrolling up
  //       if (currentTop < this.previousTop) {
  //         //if scrolling up...
  //         if (currentTop > 0 && $("#mainNav").hasClass("is-fixed")) {
  //           $("#mainNav").addClass("is-visible");
  //         } else {
  //           $("#mainNav").removeClass("is-visible is-fixed");
  //         }
  //       } else if (currentTop > this.previousTop) {
  //         //if scrolling down...
  //         $("#mainNav").removeClass("is-visible");
  //         if (currentTop > headerHeight && !$("#mainNav").hasClass("is-fixed"))
  //           $("#mainNav").addClass("is-fixed");
  //       }
  //       this.previousTop = currentTop;
  //     }
  //   );
  // }

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        variant="light"
        id="mainNav"
        fixed="top"
      >
        <Container>
          <Navbar.Brand className="navbar-brand">FLQuenano</Navbar.Brand>
          <Navbar.Toggle
            className="navbar-toggler navbar-toggler-right"
            aria-controls="responsive-navbar-nav"
          />
          <Navbar.Collapse
            className="justify-content-end navbar-nav"
            id="navbarResponsive"
          >
            <Nav.Link className="nav-item nav-link">Home</Nav.Link>
            <Nav.Link className="nav-item nav-link">Projects</Nav.Link>
            <Nav.Link className="nav-item nav-link">Blog</Nav.Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavigationBar;
