import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Pagination,
  Button,
  Form
} from "react-bootstrap";
import moment from "moment";
import API from "../../util/fetchAPI.util";
import Spinner from "../spinner/spinner.component";
import "./dashboard.scss";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState({});
  const [articleCnt, setArticleCnt] = useState(1);

  useEffect(() => {
    const getAll = async () => {
      const res = await API.get(`/article?page=${articleCnt}`, false);
      console.log(res);
      setArticles(res.data.articles);
      setLoading(false);
    };
    getAll();
  }, []);

  const paginate = () => {};

  let active = 2;
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }

  const paginationBasic = (
    <div>
      <Pagination>{items}</Pagination>
    </div>
  );
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Container style={{ minHeight: "78vh" }}>
          <br />
          <br />
          <br />
          <br />
          <br />
          <Row>
            <Col>
              <Form.Group
                controlId="post_title"
                style={{ width: "300px", float: "right" }}
              >
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Search Title"
                  name="title"
                />
              </Form.Group>
              <Table bordered striped style={{ minHeight: "500px" }}>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Date Added</th>
                    <th>Options</th>
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
                      <td></td>
                    </tr>
                  ))}
                  {articles.map((article, idx) => (
                    <tr key={idx}>
                      <td>{article.title}</td>
                      <td>
                        {moment(new Date(article.date_added)).format(
                          "MMMM Do, YYYY"
                        )}
                      </td>
                      <td></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div style={{ float: "right" }}>
                <Pagination>{items}</Pagination>
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default Dashboard;
