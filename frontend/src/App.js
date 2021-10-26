import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "@mui/material";

import Navbar from "./components/dynamic/Navbar.js";
import IndexPage from "./components/dynamic/IndexPage.js";
import Home from "./components/dynamic/Home.js";

import ScrollToTop from "./helpers/ScrollToTop.js";
function App() {
  return (
    <div className="App">
      <ScrollToTop />
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <IndexPage />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
