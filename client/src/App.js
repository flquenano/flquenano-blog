import React from "react";
import { Switch, Route } from "react-router-dom";

import Navbar from "./components/navigation/nav.component";

import Content from "./components/content/content.component";
import Footer from "./components/footer/footer.component";
import Post from "./components/post/post.component";
import EditPost from "./components/edit-post/edit-post.component";
import AddPost from "./components/add-post/add-post.component";
import Login from "./components/user/login/login.component";
import Article from "./components/post/post.component";
import Dashboard from "./components/dashboard/dashboard.component";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Content />
        </Route>
        <Route exact path="/article/create">
          <AddPost />
        </Route>
        <Route exact path="/article/:id">
          <Article />
        </Route>
        <Route exact path="/article/edit/:id">
          <EditPost />
        </Route>
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>
      </Switch>
      {/* <Header /> */}
      {/* <AddPost /> */}
      {/* <Login /> */}
      {/* <Post /> */}
      {/* /<Content /> */}
      {/* <Article /> */}
      <hr />
      <Footer />
    </div>
  );
}

export default App;
