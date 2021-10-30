import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "@mui/material";

import Navbar from "./components/dynamic/Navbar.js";
import IndexPage from "./components/dynamic/IndexPage.js";
import Home from "./components/dynamic/Home.js";

import ScrollToTop from "./helpers/ScrollToTop.js";
function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [credentials, setCredentials] = useState({
    user: "hasan0877",
    password: "abcdefg",
  });
  useEffect(() => {
    checkCredentials(setIsAuth);
  }, []);
  useEffect(() => {
    console.log(isAuth);
  }, [isAuth]);

  function checkCredentials(credentials, authHandler) {
    if (credentials.user === "hasan0877" && credentials.password === "abcdefg")
      authHandler(true);
  }

  function Authorization() {
    if (!isAuth) return <IndexPage />;
    else return <Home />;
  }
  return (
    <div className="App">
      <ScrollToTop />
      <Navbar authHandler={setIsAuth} />
      <Switch>
        <Route path="/home" exact>
          {Authorization()}
        </Route>
        {/* <Route path="/login"></Route> */}
      </Switch>
    </div>
  );
}

export default App;
