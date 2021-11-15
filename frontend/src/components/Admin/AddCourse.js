import React from "react";

import { Container, Grid, Box, TextField, Button } from "@mui/material";
import PhotoUploader from "../../helpers/CloudinaryWidget";
export default function AddCourses() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };

  return (
    <Container maxWidth="100%">
      <Grid container>
        <Grid item xs={12} lg={12}>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              name="Course Name"
              label="Course Name"
              type="text"
              id="course_name"
            />
            <PhotoUploader></PhotoUploader>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, width: 300 }}
            >
              Sign In
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
