import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Avatar,
  Snackbar,
  Alert,
  CssBaseline,
} from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import { createTheme } from "@mui/material/styles";

function formatDateStringWithRegex(dateString) {
  const regex = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})Z\[UTC\]/;
  const match = dateString?.match(regex);

  if (match) {
    const year = match[1];
    const month = match[2];
    const day = match[3];
    const hour = match[4];
    const minute = match[5];
    // Assemble the components into the desired format 'dd-mm-yyyy hh:mm'
    return `${day}-${month}-${year} ${hour}:${minute}`;
  }

  return ""; // Return an empty string or some default error message if the regex does not match
}

export default function EventDetailsMain({ event, organiser }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = React.useState();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const theme = createTheme({
    palette: {
      customColor: {
        main: "#EFBC9B",
        contrastText: "#fff",
      },
    },
  });

  return (
    <Grid
      container
      component="main"
      sx={{ height: "100vh", width: "100vw", m: 0, mt: -5 }}
    >
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={false}
        md={7}
        sx={{
          position: "relative",
          backgroundColor: "#D6DAC8",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <AspectRatio
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            display: { xs: "none", sm: "none", md: "flex" },
          }}
          ratio="3/4"
        >
          <Box
            id="image"
            component="img"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              width: "100%",
            }}
            src={event.imageURL}
            alt="Event image"
          />
        </AspectRatio>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={5}
        backgroundColor="#FBF3D5"
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Box
          sx={{
            mx: 4,
            mt: { xs: 15, md: 0 },
            display: "flex",
            flexDirection: "column",
            // alignItems: "center",
            justifyContent: { xs: "flex-start", sm: "center" },
            height: "100vh",
            width: { xs: "100%", md: "60%" },
          }}
        >
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert
              onClose={handleClose}
              severity="error"
              variant="filled"
              sx={{ width: "100%" }}
            >
              {errorMessage}
            </Alert>
          </Snackbar>
          <Typography
            variant="h4"
            gutterBottom
            component="div"
            sx={{ fontWeight: "bold", mb: 3, fontFamily: "nunito, sans-serif" }}
          >
            {event.title}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Typography
              variant="subtitle1"
              sx={{ color: "#666", fontFamily: "nunito, sans-serif" }}
            >
              By {organiser.name}
            </Typography>
            <Avatar
              alt="Organiser profile picture"
              src={organiser.imageURL}
              sx={{ ml: 2, width: 35, height: 35 }}
            />
          </Box>

          <Typography
            variant="h6"
            sx={{ mb: 1, fontFamily: "nunito, sans-serif" }}
          >
            Date: {formatDateStringWithRegex(event.date)}
          </Typography>

          <Typography
            variant="h6"
            sx={{ mb: 1, fontFamily: "nunito, sans-serif" }}
          >
            Deadline: {formatDateStringWithRegex(event.deadline)}
          </Typography>

          <Typography
            variant="h6"
            sx={{ mb: 1, fontFamily: "nunito, sans-serif" }}
          >
            Location: {event.location}
          </Typography>

          <Typography
            variant="h6"
            sx={{ mb: 1, fontFamily: "nunito, sans-serif" }}
          >
            Description: {event.description}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
