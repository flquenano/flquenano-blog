import React from "react";
import { Link } from "react-router-dom";
import "./_content-item.scss";

const ContentItem = ({ link, title, subTitle, postMeta }) => (
  <>
    <div className="post-preview">
      <Link to="/post/:id">
        <h2 className="post-title">
          Man must explore, and this is exploration at its greatest
        </h2>
        <h3 className="post-subtitle">
          Problems look mighty small from 150 miles up
        </h3>
      </Link>
      <p className="post-meta">
        Posted by
        <Link to="/test"> Start Bootstrap </Link>
        on September 24, 2019
      </p>
    </div>
    <hr />
  </>
);

export default ContentItem;
