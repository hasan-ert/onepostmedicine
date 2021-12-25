import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { getAllUserData } from "../../api/user.API";

export default function DisplayUsers() {
  const [users, setUsers] = useState();
  const gridColor = "rgba(0,182,232,0.6)";
  useEffect(() => {
    getAllUserData().then((res) => {
      setUsers(res);
    });
  }, []);

  const createUserInfoRow = () => {
    return (
      <Grid container maxWidth={"100%"}>
        {users
          ? users.map((user) => {
              return (
                <Grid container maxWidth="100%">
                  <Grid
                    item
                    xs={12}
                    lg={3}
                    border={"solid"}
                    borderColor={"black"}
                    padding="10px"
                    style={{ wordBreak: "break-word" }}
                    bgcolor={gridColor}
                  >
                    <p>{user.name}</p>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    lg={3}
                    border={"solid"}
                    borderColor={"black"}
                    padding="10px"
                    style={{ wordBreak: "break-word" }}
                    bgcolor={gridColor}
                  >
                    <p>{user.surname} </p>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    lg={3}
                    border={"solid"}
                    borderColor={"black"}
                    padding="10px"
                    style={{ wordBreak: "break-word" }}
                    bgcolor={gridColor}
                  >
                    <p>{user.university}</p>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    lg={3}
                    border="solid"
                    borderColor={"black"}
                    padding="10px"
                    style={{ wordBreak: "break-word" }}
                    bgcolor={gridColor}
                  >
                    <p>
                      {(user.completed_courses.length /
                        (user.unfinished_courses.length +
                          user.completed_courses.length)) *
                        100}
                    </p>
                  </Grid>
                </Grid>
              );
            })
          : ""}
      </Grid>
    );
  };

  return (
    <Grid
      container
      marginTop="3%"
      maxWidth={"100%"}
      padding="5%"
      border="solid"
      borderRadius={"5px"}
    >
      <Grid item xs={12} lg={12} textAlign="center" marginBottom="20px">
        <h1>User Display Panel</h1>
      </Grid>

      <Grid item xs={12} lg={3} textAlign="center">
        <h4>Name</h4>
      </Grid>

      <Grid item xs={12} lg={3} textAlign="center">
        <h4>Surname</h4>
      </Grid>
      <Grid item xs={12} lg={3} textAlign="center">
        <h4>University</h4>
      </Grid>
      <Grid item xs={12} lg={3} textAlign="center">
        <h4>Completion of Taken Courses(%)</h4>
      </Grid>
      <Grid container maxWidth="100%">
        {createUserInfoRow()}
      </Grid>
    </Grid>
  );
}
