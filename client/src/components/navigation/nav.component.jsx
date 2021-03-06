import React, { useState, useEffect, useContext } from "react";
import "./navigation.scss";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useRouteMatch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutStart } from "../../redux/user/user.actions";
import { getPostsStart } from "../../redux/post/post.actions";

const NavigationBar = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const logout = () => {
    dispatch(logoutStart());
  };

  const home = () => {
    dispatch(getPostsStart(1));
  };
  const { url } = useRouteMatch();

  let MinWidth = 992;
  let previousTop = 0;

  const [cssClasses, setCssClasses] = useState({
    isVisible: true,
    isFixed: true
  });

  useEffect(() => {
    window.addEventListener("scroll", scrollListener); // eslint-disable-next-line
    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  const scrollListener = function () {
    const headerHeight = document.getElementById("mainNav").offsetHeight;
    let currentTop = window.scrollY;

    if (MinWidth < window.innerWidth) {
      //check if user is scrolling up
      if (currentTop < previousTop) {
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
            <Nav>
              <Nav.Link
                as={Link}
                onClick={home}
                to={url}
                className="nav-item nav-link"
              >
                Home
              </Nav.Link>
              {isLoggedIn ? (
                <Nav.Link
                  as={Link}
                  to={`${url}/dashboard`}
                  className="nav-item nav-link"
                >
                  Dashboard
                </Nav.Link>
              ) : null}
            </Nav>
            <Nav className="justify-content-end" style={{ width: "100%" }}>
              {isLoggedIn ? (
                <>
                  <Nav.Link
                    className="nav-item nav-link"
                    style={{ borderRight: "2px solid #fff" }}
                  >
                    Settings
                  </Nav.Link>
                  <Nav.Link
                    className="nav-item nav-link"
                    onClick={() => logout()}
                  >
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link
                    className="nav-item nav-link"
                    style={{ borderRight: "2px solid #fff" }}
                    as={Link}
                    to="/blog/login"
                  >
                    Login
                  </Nav.Link>
                  <Nav.Link
                    className="nav-item nav-link"
                    as={Link}
                    to="/blog/register"
                  >
                    Register
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavigationBar;
