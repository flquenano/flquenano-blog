import React from "react";
import { Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import Navbar from "./components/navigation/nav.component";

import Content from "./components/content/content.component";
import Footer from "./components/footer/footer.component";
import Post from "./components/post/post.component";
import EditPost from "./components/edit-post/edit-post.component";
import AddPost from "./components/add-post/add-post.component";
import Login from "./components/user/login/login.component";
import Article from "./components/post/post.component";
import Dashboard from "./components/dashboard/dashboard.component";
import { NotFound } from "./pages/404/notFound.page";
import HomePage from "./pages/home/home.page";
function App() {
  return (
    <div className="App" as={Container}>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/Blog">
          <Content />
        </Route>
        <Route exact path="/posts/create">
          <AddPost />
        </Route>
        <Route exact path="/posts/:id">
          <Article />
        </Route>
        <Route exact path="/posts/edit/:id">
          <EditPost />
        </Route>
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="*" component={NotFound} />
      </Switch>
      {/* <Header /> */}
      {/* <AddPost /> */}
      {/* <Login /> */}
      {/* <Post /> */}
      {/* /<Content /> */}
      {/* <Article /> */}

      <Footer />
    </div>
  );
}

export default App;
