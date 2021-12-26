import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "@mui/material";

import Navbar from "./components/dynamic/Navbar.js";
import IndexPage from "./components/dynamic/IndexPage.js";
import Home from "./components/dynamic/Home.js";
import SignUp from "./components/dynamic/SignUp.js";
import SignInSide from "./components/dynamic/SignIn.js";
import Quiz from "./components/dynamic/Quiz";

import AddQuizzes from "./components/Admin/AddQuizzes";
import CreateQuizzes from "./components/Admin/CreateQuizzzes";
import AddCourses from "./components/Admin/AddCourse.js";
import Courses from "./components/dynamic/Courses.js";
import ScrollToTop from "./helpers/ScrollToTop.js";
import Lecture from "./components/dynamic/Lecture.js";
import Quizzes from "./components/dynamic/Quizzes";
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
import SocialFollow from "./components/Sub-Components/SocialFollow";
import AdminPanel from "./components/Admin/AdminPanel.js";
import DeleteLectures from "./components/Admin/DeleteLecture.js";
import EditProfile from "./components/dynamic/EditProfile.js";
import DisplayUsers from "./components/Admin/DisplayUsers.js";
import { getUserData } from "./api/user.API.js";

function App() {
  const [user, setUser] = useState();
  const [userData, setUserData] = useState();

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  useEffect(() => {
    if (user)
      getUserData().then((res) => {
        setUserData(res);
      });
  }, [user]);

  function Authorization() {
    return isAuthorized(user) ? Authorized() : unauthorized();
  }

  function isAdmin() {
    if (user && userData && userData.is_admin) {
      return (
        <div>
          <Route path="/adminPanel">
            <AdminPanel />
          </Route>
          <Route path="/addCourse">
            {" "}
            <AddCourses />{" "}
          </Route>
          <Route path="/addLecture">
            {" "}
            <AddLectures />{" "}
          </Route>
          <Route path="/addQuizzes">
            {" "}
            <CreateQuizzes /> <AddQuizzes />{" "}
          </Route>
          <Route path="/deleteLecture">
            {" "}
            <DeleteLectures />{" "}
          </Route>
          <Route path="/displayUsers">
            {" "}
            <DisplayUsers />{" "}
          </Route>
        </div>
      );
    }
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
        <Route path="/editProfile">
          <EditProfile />
        </Route>
        <Route path="/lecture/:coursename/:name">
          <Lecture />
        </Route>
        <Route path="/quiz/:coursename">
          <Quiz />
        </Route>
        <Route path="/quizzes">
          <Quizzes />
        </Route>
        {isAdmin()}
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
        {Authorization()}
        {/* <SocialFollow /> */}
      </Container>
    </div>
  );
}

export default App;
