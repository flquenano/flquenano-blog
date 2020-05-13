import React from "react";
import { Col } from "react-bootstrap";
const th = ({ content }) => (
  <>
    <th
      as={Col}
      md={7}
      style={{
        position: "sticky",
        top: "0",
        background: "#fff",
        zIndex: "999"
      }}
    >
      {content}
    </th>
  </>
);

export default th;
