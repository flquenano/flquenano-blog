import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import "./_content-item.scss";

const ContentItem = ({
  post: {
    date_added,
    title,
    subtitle,
    _id,
    user: { account_name }
  }
}) => {
  return (
    <>
      <div className="post-preview">
        <Link
          to={{
            pathname: `posts/${title.replace(/\s/g, "-")}`,
            state: { id: _id }
          }}
        >
          <h2 className="post-title">{title}</h2>
          <h3 className="post-subtitle">{subtitle}</h3>
        </Link>
        <p className="post-meta">
          Posted by<b> {account_name}</b> on&nbsp;
          {moment(new Date(date_added)).format("MMMM Do, YYYY")}
        </p>
      </div>
      <hr />
    </>
  );
};

export default ContentItem;
