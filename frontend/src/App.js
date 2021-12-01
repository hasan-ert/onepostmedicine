import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "@mui/material";

import Navbar from "./components/dynamic/Navbar.js";
import IndexPage from "./components/dynamic/IndexPage.js";
import Home from "./components/dynamic/Home.js";
import SignUp from "./components/dynamic/SignUp.js";
import SignInSide from "./components/dynamic/SignIn.js";
import Quizes from "./components/dynamic/Quiz";

import AddCourses from "./components/Admin/AddCourse.js";
import Courses from "./components/dynamic/Courses.js";
import ScrollToTop from "./helpers/ScrollToTop.js";
import Lecture from "./components/dynamic/Lecture.js";
import { isAuthorized } from "./helpers/helpers";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "./constants/firebase-config";
import AddLectures from "./components/Admin/AddLecture.js";
import Deneme from "./components/Test.js";

function App() {
  const [user, setUser] = useState();

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
  useEffect(() => {
    console.log(user);
  }, []);

  function Authorization() {
    return isAuthorized(user) ? Authorized() : unauthorized();
  }
  function Authorized() {
    console.log("authorized");
    return (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/test">
          <Deneme />
        </Route>
        <Route path="/courses">
          <Courses />
        </Route>
        <Route path="/lecture/:name">
          <Lecture />
        </Route>
        {/* <Route path="/login"></Route> */}
        {/* <Route path="/home">
          {Authorization}
        </Route> */}

        <Route path="/courses">
          {" "}
          <Courses />{" "}
        </Route>
        <Route path="/quizes">
          <Quizes />
        </Route>
        <Route path="/addCourse">
          {" "}
          <AddCourses />{" "}
        </Route>
        <Route path="/addLecture">
          {" "}
          <AddLectures />{" "}
        </Route>
        {/* <Route path="/login"></Route> */}
      </Switch>
    );
  }
  function unauthorized() {
    console.log("unauthorized");
    return (
      <Switch>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/signin">
          <SignInSide />
        </Route>
        <IndexPage path="/" exact></IndexPage>
      </Switch>
    );
  }
  return (
    <div className="App">
      <ScrollToTop />
      <Navbar user={user} />
      <Container maxWidth="100%" marginTop="20px">
        {/* <Switch>
          <Route path="/home" exact>
            {Authorization()}
          </Route>
          <Route path="/courses">
            <Courses />
          </Route>
          <Route path="/lecture/:id">
            <Lecture />
          </Route>
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

    
        </Switch> */}
        {Authorization()}
      </Container>
    </div>
  );
}

export default App;
