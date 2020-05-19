import React from "react";
import { Link } from "react-router-dom";
import "./noticeBar.scss";

const noticeBar = () => {
  return (
    <div className="notice-bar">
      <Link style={{ textDecoration: "none" }} to="/">
        <span
          className="h5 my-auto"
          style={{ float: "left", marginLeft: "2rem" }}
        >
          ←Back
        </span>
      </Link>

      <span>Site is still in Development</span>
    </div>
  );
};

export default noticeBar;
