import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import "../componentCss/MainComponents/Navbar.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { signOut } from "firebase/auth";
import { auth } from "../../constants/firebase-config";
import { getUserData } from "../../api/user.API";

export default function Navbar({ user }) {
  const [userData, setUserData] = useState();

  useEffect(() => {
    getUserData().then((res) => {
      console.log(res);
      setUserData(res);
    });
  }, [user]);

  const history = useHistory();

  const logout = async () => {
    await signOut(auth);
    history.push("/");
  };

  const isAuth = () => {
    if (auth.currentUser === null)
      return (
        <div>
          <Button component={Link} to={"/signin"} color="inherit">
            Login
          </Button>
          <Button component={Link} to={"/signup"} color="inherit">
            Sign Up
          </Button>
        </div>
      );
    else {
      if (userData && userData.is_admin) {
        return (
          <div>
            <Button component={Link} color="inherit" to="/adminPanel">
              Admin Panel
            </Button>
            <Button
              color="inherit"
              onClick={() => {
                logout();
              }}
            >
              Logout
            </Button>
          </div>
        );
      } else {
        return (
          <div>
            <Button
              color="inherit"
              onClick={() => {
                logout();
              }}
            >
              Logout
            </Button>
          </div>
        );
      }
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className="navbar">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button
              onClick={() => {
                history.push("/");
              }}
              style={{ color: "white",
                fontFamily: "fangsong",
                fontSize: "16pt",
            }}
            >
              One Post Medicine
            </Button>
          </Typography>
          {isAuth()}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
