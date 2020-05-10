import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import "./_content-item.scss";

const ContentItem = ({ link, title, subTitle, postMeta }) => (
  <>
    <div className="post-preview">
      <Link to={link}>
        <h2 className="post-title">{title}</h2>
        <h3 className="post-subtitle">{subTitle}</h3>
      </Link>
      <p className="post-meta">
        Posted by<b> Francis Quenano </b>on&nbsp;
        {moment(new Date(postMeta)).format("MMMM Do, YYYY")}
      </p>
    </div>
    <hr />
  </>
);

export default ContentItem;
