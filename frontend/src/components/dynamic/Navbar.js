import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import "../componentCss/MainComponents/Navbar.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import {
signOut,
} from "firebase/auth";
import {auth} from '../../constants/firebase-config' 
export default function Navbar({user}) {
  const history =  useHistory()
  const logout = async () => {
    console.log('giriyor')
    await signOut(auth);
    history.push('/')
  };
  const isAuth = () => {
    if(!user)
    return (
      <div>
      <Button
            component={Link}
            to={"/signin"}
            color="inherit"
            onClick={() => {}}
          >
            Login
          </Button>
          <Button
            component={Link}
            to={"/signup"}
            
            color="inherit"
            
          >
            Sign Up
          </Button>
        </div>
    )
    else
    return (
      
      <div>
        <Button
            color="inherit"
            onClick={() => {logout()}}
          >
            Logout
          </Button>
      </div>
    )
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className="navbar">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            One Post Medicine
          </Typography>
          {
            isAuth()
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}
