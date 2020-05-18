import React, { useReducer } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Container } from "react-bootstrap";

import { Provider } from "./context/store";
import { initialAuthState, authReducer } from "./context/reducers/auth.reducer";

import { NotFound } from "./pages/404/notFound.page";
import HomePage from "./pages/home/home.page";
import BlogPage from "./pages/blog/blog.page";
import Footer from "./components/footer/footer.component";
function App() {
  const useAuthState = useReducer(authReducer, initialAuthState);
  return (
    <div className="App" as={Container}>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/blog">
          <Provider value={useAuthState}>
            <BlogPage />
          </Provider>
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
