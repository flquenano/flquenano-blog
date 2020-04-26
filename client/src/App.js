import React from "react";
import {} from "react-router-dom";

import Navbar from "./components/navigation/nav.component";
import Header from "./components/header/header.component";
import Content from "./components/content/content.component";
import Footer from "./components/footer/footer.component";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Header />

      <Content />
      <hr />
      <Footer />
    </div>
  );
}

export default App;
