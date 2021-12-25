import Drawer from "@mui/material/Drawer";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

const drawerWidth = 240;

function PermanentDrawerLeft() {
  return (
    <Box
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        width: drawerWidth,
        boxSizing: "border-box",
        marginTop: "4.5rem",
        border: "none",
        justifyContent: "center",
      }}
    >
      <Box sx={{ overflow: "auto" }}>
        <List sx={{ marginRight: "2rem" }}>
          {["Home", "Courses", "Quizzes",].map((text, index) => (
            <ListItem
              button
              key={text}
              component={Link}
              to={"/" + text.toLowerCase()}
            >
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}
export default PermanentDrawerLeft;
