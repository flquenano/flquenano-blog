import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { Container } from "react-bootstrap";

import Navbar from "../../components/navigation/nav.component";
import Content from "../../components/content/content.component";
import Post from "./post.page";
// import EditPost from "../../components/edit-post/edit-post.component";
import EditPost from "../blog/edit-post.page";
// import AddPost from "../../components/add-post/add-post.component";
import AddPost from "./add-post.page";
import Login from "../../components/user/login/login.component";
import Register from "../../components/user/register/register.component";
import Dashboard from "../../components/dashboard/dashboard.component";
import { NotFound } from "../404/notFound.page";
import NoticeBar from "../../components/notice-bar/notice-bar.component";
import ContentPage from "../blog/content.page";
const BlogPage = ({ user }) => {
  const { url } = useRouteMatch();

  return (
    <div className="App" as={Container}>
      <Navbar />
      <Switch>
        <Route exact path={`${url}`}>
          <ContentPage />
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
      <NoticeBar />
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(BlogPage);
