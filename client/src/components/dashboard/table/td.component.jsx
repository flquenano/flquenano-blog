import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import moment from "moment";
import { faCog, faTimesCircle, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
const td = ({ post, remove }) => (
  <tr>
    <td>{post.title}</td>
    <td>{moment(new Date(post.date_added)).format("MMMM Do, YYYY")}</td>
    <td>
      <ButtonGroup aria-label="Basic example" size="sm">
        <Button
          as={Link}
          to={{
            pathname: `posts/${post.title.replace(/\s/g, "-")}`,
            state: { id: post._id }
          }}
          variant="primary"
          style={{ marginLeft: "2px" }}
        >
          <FontAwesomeIcon icon={faEye} size="lg" />
        </Button>

        <Button
          as={Link}
          to={{
            pathname: `posts/edit/${post.title.replace(/\s/g, "-")}`,
            state: { id: post._id }
          }}
          variant="primary"
          style={{ marginLeft: "2px" }}
        >
          <FontAwesomeIcon icon={faCog} size="lg" />
        </Button>

        <Button
          variant="primary"
          onClick={() => remove(post._id, post.title)}
          style={{ marginLeft: "2px" }}
        >
          <FontAwesomeIcon icon={faTimesCircle} size="lg" />
        </Button>
      </ButtonGroup>
    </td>
  </tr>
);

export default td;
