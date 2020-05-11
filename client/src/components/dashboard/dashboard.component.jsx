import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  ButtonGroup,
  Form
} from "react-bootstrap";
import moment from "moment";
import { faCog, faTimesCircle, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import API from "../../util/fetchAPI.util";
import Spinner from "../spinner/spinner.component";
import "./dashboard.scss";
const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState({});
  const [articleCnt, setArticleCnt] = useState(1);
  const [active, setActive] = useState(1);

  const icons = [faEye, faCog, faTimesCircle];

  useEffect(() => {
    const getAll = async () => {
      const res = await API.get(`/article?page=${articleCnt}`, false);
      setArticles(res.data.articles);
      setLoading(false);
    };
    getAll();
  }, []);

  useEffect(() => {
    console.log("only run when active change");
  }, [active]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Container className="dashboard" style={{ minHeight: "78vh" }}>
          <br />
          <br />
          <br />
          <br />
          <br />
          <Row>
            <Col>
              <Form.Group controlId="post_title">
                <Form.Control
                  type="text"
                  placeholder="Search Title"
                  name="title"
                />
              </Form.Group>
              <div
                style={{
                  minHeight: "400px",
                  height: "400px",
                  width: "100%",
                  overflow: "auto"
                }}
              >
                <Table bordered striped>
                  <thead>
                    <tr as={Row} style={{}}>
                      <th
                        as={Col}
                        md={7}
                        style={{
                          position: "sticky",
                          top: "0",
                          background: "#fff"
                        }}
                      >
                        Title
                      </th>
                      <th
                        as={Col}
                        md={3}
                        style={{
                          position: "sticky",
                          top: "0",
                          background: "#fff"
                        }}
                      >
                        Date Added
                      </th>
                      <th
                        as={Col}
                        md={2}
                        style={{
                          position: "sticky",
                          top: "0",
                          background: "#fff",
                          zIndex: "999"
                        }}
                      >
                        Options
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {articles.map((article, idx) => (
                      <tr key={idx}>
                        <td>{article.title}</td>
                        <td>
                          {moment(new Date(article.date_added)).format(
                            "MMMM Do, YYYY"
                          )}
                        </td>
                        <td>
                          <ButtonGroup aria-label="Basic example" size="sm">
                            <Button
                              variant="primary"
                              style={{ marginLeft: "2px" }}
                            >
                              <Link
                                to={{
                                  pathname: `article/${article.title.replace(
                                    /\s/g,
                                    "-"
                                  )}`,
                                  state: { id: article._id }
                                }}
                              >
                                <FontAwesomeIcon icon={faEye} size="lg" />
                              </Link>
                            </Button>

                            <Button
                              variant="primary"
                              style={{ marginLeft: "2px" }}
                            >
                              <Link
                                to={{
                                  pathname: `article/edit/${article.title.replace(
                                    /\s/g,
                                    "-"
                                  )}`,
                                  state: { id: article._id }
                                }}
                              >
                                <FontAwesomeIcon icon={faCog} size="lg" />
                              </Link>
                            </Button>

                            <Button
                              variant="primary"
                              style={{ marginLeft: "2px" }}
                            >
                              <FontAwesomeIcon icon={faTimesCircle} size="lg" />
                            </Button>
                          </ButtonGroup>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default Dashboard;
