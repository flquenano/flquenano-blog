import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const FooterItem = ({ icon, link }) => (
  <li className="list-inline-item">
    <Link to={link} target="_blank" className="link-icon">
      <FontAwesomeIcon icon={icon} size="3x" />
    </Link>
  </li>
);

export default FooterItem;
