import React from "react";
import { Link } from "react-router-dom";
import "./_content-item.scss";

const ContentItem = ({ link, title, subTitle, postMeta }) => (
  <>
    <div class="post-preview">
      <Link to="/post/:id">
        <h2 class="post-title">
          Man must explore, and this is exploration at its greatest
        </h2>
        <h3 class="post-subtitle">
          Problems look mighty small from 150 miles up
        </h3>
      </Link>
      <p class="post-meta">
        Posted by
        <Link> Start Bootstrap </Link>
        on September 24, 2019
      </p>
    </div>
    <hr />
  </>
);

export default ContentItem;
