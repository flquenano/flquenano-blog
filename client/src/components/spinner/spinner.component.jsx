import React from "react";
import { Spinner } from "react-bootstrap";
import "./spinner.scss";

const SpinnerComponent = () => (
  <div className="spinner-container">
    <div className="spinner">
      <Spinner animation="border" className="spinner-icon" />
    </div>
  </div>
);

export default SpinnerComponent;
