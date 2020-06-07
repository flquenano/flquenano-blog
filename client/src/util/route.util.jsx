import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

const isLoggedIn = false;

export const PrivateRoute = ({ component: Component, ...otherProps }) => (
  <Route>
    {isLoggedIn ? <Component {...otherProps} /> : <Redirect to="/blog/login" />}
  </Route>
);

export const PublicRoute = ({
  component: Component,
  restricted,
  ...otherProps
}) => (
  <Route>
    {isLoggedIn && restricted ? (
      <Redirect to="/blog/dashboard" />
    ) : (
      <Component {...otherProps} />
    )}
  </Route>
);
