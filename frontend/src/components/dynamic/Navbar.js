import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import "../componentCss/MainComponents/Navbar.css";
export default function Navbar({ authHandler }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className="navbar">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            One Post Medicine
          </Typography>
          <Button
            color="inherit"
            onClick={() => {
              authHandler(true);
            }}
          >
            Login
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              authHandler(false);
            }}
          >
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
