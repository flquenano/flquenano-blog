import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Container } from "react-bootstrap";

import Footer from "./components/footer/footer.component";
import { NotFound } from "./pages/404/notFound.page";
import HomePage from "./pages/home/home.page";
import BlogPage from "./pages/blog/blog.page";
function App() {
  return (
    <div className="App" as={Container}>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/blog">
          <BlogPage />
        </Route>
        <Route exact path="*">
          <Redirect to="/" />
        </Route>
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
