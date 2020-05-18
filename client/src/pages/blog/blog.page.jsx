import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { Container } from "react-bootstrap";

import Navbar from "../../components/navigation/nav.component";
import Content from "../../components/content/content.component";
import Post from "../../components/post/post.component";
import EditPost from "../../components/edit-post/edit-post.component";
import AddPost from "../../components/add-post/add-post.component";
import Login from "../../components/user/login/login.component";
import Register from "../../components/user/register/register.component";
import Dashboard from "../../components/dashboard/dashboard.component";
import { NotFound } from "../404/notFound.page";

const BlogPage = () => {
  const { url } = useRouteMatch();

  return (
    <div className="App" as={Container}>
      <Navbar />
      <Switch>
        <Route exact path={`${url}`}>
          <Content />
        </Route>
        <Route exact path={`${url}/posts/create`}>
          <AddPost />
        </Route>
        <Route exact path={`${url}/posts/:id`}>
          <Post />
        </Route>
        <Route exact path={`${url}/posts/edit/:id`}>
          <EditPost />
        </Route>
        <Route exact path={`${url}/dashboard`}>
          <Dashboard />
        </Route>
        <Route exact path={`${url}/login`}>
          <Login />
        </Route>
        <Route exact path={`${url}/register`}>
          <Register />
        </Route>
        <Route exact path="*" component={NotFound} />
      </Switch>
    </div>
  );
};

export default BlogPage;
