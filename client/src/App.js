import React from "react";
import { Switch, Route } from "react-router-dom";

import Navbar from "./components/navigation/nav.component";
import Header from "./components/header/header.component";
import Content from "./components/content/content.component";
import Footer from "./components/footer/footer.component";
import Post from "./components/post/post.component";
import AddPost from "./components/add-post/add-post.component";
import Login from "./components/user/login/login.component";
import Article from "./components/post/post.component";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Header />
          /<Content />
        </Route>
        <Route exact path="/article/create">
          <AddPost />
        </Route>
        <Route exact path="/article/:id">
          <Article />
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
