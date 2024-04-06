import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Avatar,
  Snackbar,
  Alert,
  CssBaseline,
  Button,
  Modal,
} from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Api from "../../helpers/Api";
import { useNavigate } from "react-router-dom";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DescriptionIcon from "@mui/icons-material/Description";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

function formatDateStringWithRegex(dateString) {
  const regex = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})Z\[UTC\]/;
  const match = dateString?.match(regex);

  if (match) {
    const year = match[1];
    const month = match[2];
    const day = match[3];
    const hour = match[4];
    const minute = match[5];
    return `${day}-${month}-${year} ${hour}:${minute}`;
  }

  return "";
}

export default function EventDetailsMain({ id, selectedEvent, organiser }) {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [registered, setRegistered] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = React.useState();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleRegisterClick = () => {
    const eventId = id;
    Api.registerForEvent(eventId)
      .then(() => {
        handleOpenSnackbar("Successfully registered for event", "success");
        setRegistered(true);
      })
      .catch((error) => {
        handleOpenSnackbar(error.message, "error");
      });
  };

  const handleUnregisterClick = () => {
    const eventId = id;
    Api.unregisterForEvent(eventId)
      .then(() => {
        handleOpenSnackbar("Successfully unregistered for event", "success");
        setRegistered(false);
      })
      .catch((error) => {
        handleOpenSnackbar(error.message, "error");
      });
  };

  const handleDeleteClick = () => {
    const eventId = id;
    Api.deleteEvent(eventId)
      .then(() => {
        navigate("/home");
      })
      .catch((error) => {
        handleOpenSnackbar(error.message, "error");
      });
  };

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await Api.getAccount();
      setUserId(fetchedUser.id);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const isRegistered = async () => {
      console.log("id", id);
      const registered = await Api.isRegistered(id);
      setRegistered(registered);
    };

    isRegistered();
  }, []);

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
            src={selectedEvent.imageURL}
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
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity={snackbarSeverity}
              variant="filled"
              sx={{ width: "100%" }}
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>
          <Typography
            variant="h3"
            gutterBottom
            component="div"
            sx={{ fontWeight: "bold", mb: 2, fontFamily: "nunito, sans-serif" }}
          >
            {selectedEvent.title}
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
            Date: <br />
            <div>
              <CalendarMonthIcon sx={{ mb: -0.5, mr: 1 }} />
              {formatDateStringWithRegex(selectedEvent.date)}
            </div>
          </Typography>

          <Typography
            variant="h6"
            sx={{ mb: 1, fontFamily: "nunito, sans-serif" }}
          >
            Deadline: <br />
            <div>
              <EventBusyIcon sx={{ mb: -0.5, mr: 1 }} />
              {formatDateStringWithRegex(selectedEvent.deadline)}
            </div>
          </Typography>

          <Typography
            variant="h6"
            sx={{ mb: 1, fontFamily: "nunito, sans-serif" }}
          >
            Location: <br />
            <div>
              <LocationOnIcon sx={{ mb: -0.5, mr: 1 }} />
              {selectedEvent.location}
            </div>
          </Typography>

          <Typography
            variant="h6"
            sx={{ mb: 1, fontFamily: "nunito, sans-serif" }}
          >
            Description: <br />
            <div>
              <DescriptionIcon sx={{ mb: -0.5, mr: 1 }} />
              {selectedEvent.description}
            </div>
          </Typography>
          {userId === organiser.id ? (
            <ThemeProvider theme={theme}>
              <div
                onClick={() => navigate(`/attendance/${selectedEvent.id}/`)}
                style={{ textDecoration: "none", cursor: "pointer" }}
              >
                <Button
                  variant="contained"
                  color="customColor"
                  sx={{ mt: 2, borderRadius: 25, width: "100%" }}
                  endIcon={<DriveFileRenameOutlineIcon />}
                >
                  Attendance
                </Button>
              </div>
              <Button
                variant="contained"
                color="error"
                onClick={handleOpen}
                sx={{ mt: 2, borderRadius: 25 }}
                endIcon={<DeleteOutlineIcon />}
              >
                Delete Event
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      Are you sure you want to delete this event?
                    </Typography>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={handleDeleteClick}
                      sx={{ mt: 5, borderRadius: 25 }}
                      endIcon={<DeleteOutlineIcon />}
                    >
                      Delete Event
                    </Button>
                  </Box>
                </Box>
              </Modal>
            </ThemeProvider>
          ) : registered ? (
            <Button
              variant="contained"
              color="error"
              sx={{ mt: 2, borderRadius: 25 }}
              endIcon={<PersonRemoveIcon />}
              onClick={handleUnregisterClick}
            >
              {" "}
              Unregister
            </Button>
          ) : (
            <Button
              variant="contained"
              color="success"
              sx={{ mt: 2, borderRadius: 25 }}
              endIcon={<HowToRegIcon />}
              onClick={handleRegisterClick}
            >
              {" "}
              Register
            </Button>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}
