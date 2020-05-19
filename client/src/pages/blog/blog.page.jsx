import React, { useEffect, useContext } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { Container } from "react-bootstrap";
import Cookies from "js-cookie";

import Navbar from "../../components/navigation/nav.component";
import Content from "../../components/content/content.component";
import Post from "../../components/post/post.component";
import EditPost from "../../components/edit-post/edit-post.component";
import AddPost from "../../components/add-post/add-post.component";
import Login from "../../components/user/login/login.component";
import Register from "../../components/user/register/register.component";
import Dashboard from "../../components/dashboard/dashboard.component";
import { NotFound } from "../404/notFound.page";
import NoticeBar from "../../components/notice-bar/notice-bar.component";

import authContext from "../../context/store";

const BlogPage = () => {
  const { url } = useRouteMatch();
  const [state, dispatch] = useContext(authContext);
  useEffect(() => {
    const token = Cookies.get("token", { domain: "flquenano.dev" });
    if (token !== undefined) {
      dispatch({ type: "LOGIN", payload: { name: Cookies.get("name") } });
    }
  }, []);

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
      <NoticeBar />
    </div>
  );
};

export default BlogPage;
