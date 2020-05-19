import React from "react";
import "./noticeBar.scss";

const noticeBar = () => {
  return (
    <div className="notice-bar">
      <span
        className="h5 my-auto"
        style={{ float: "left", marginLeft: "2rem" }}
      >
        {" "}
        ←Back
      </span>
      <span>Site is still in Development</span>
    </div>
  );
};

export default noticeBar;
