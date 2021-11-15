import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "@mui/material";

import Navbar from "./components/dynamic/Navbar.js";
import IndexPage from "./components/dynamic/IndexPage.js";
import Home from "./components/dynamic/Home.js";
import SignUp from "./components/dynamic/SignUp.js";
import SignInSide from "./components/dynamic/SignIn.js";

import Courses from "./components/dynamic/Courses.js";
import ScrollToTop from "./helpers/ScrollToTop.js";
import Lecture from "./components/dynamic/Lecture.js";
import AddCourses from "./components/Admin/AddCourse.js";

function App() {
  const [isAuth, setIsAuth] = useState(false);

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
      <Container maxWidth="100%" marginTop="20px">
        <Switch>
          <Route path="/home" exact>
            {Authorization()}
          </Route>
          <Route path="/courses">
            <Courses />
          </Route>
          <Route path="/lecture/:id">
            <Lecture />
          </Route>
          {/* <Route path="/login"></Route> */}
          <Route path="/home" exact>
            {Authorization()}
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/signin">
            <SignInSide />
          </Route>
          <Route path="/courses">
            {" "}
            <Courses />{" "}
          </Route>
          <Route path="/addCourse">
            {" "}
            <AddCourses />{" "}
          </Route>

          {/* <Route path="/login"></Route> */}
        </Switch>
      </Container>
    </div>
  );
}

export default App;
