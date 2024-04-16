import React, { useState, useEffect } from "react";
import {
  Checkbox,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  Button,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ChecklistIcon from "@mui/icons-material/Checklist";
import NoParticipants from "../../assets/noParticipants.png";
import Api from "../../helpers/Api";
import { Height } from "@mui/icons-material";

export default function AttendanceList({ id }) {
  const [participants, setParticipants] = useState([]);
  const [attendees, setAttendees] = useState([]);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const theme = createTheme({
    palette: {
      customColor: {
        main: "#EFBC9B",
        contrastText: "#fff",
      },
    },
  });

  const handleOpenSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    const fetchAttendees = async () => {
      const fetchedAttendees = await Api.fetchAttendees(id);
      setAttendees(fetchedAttendees);
    };
    fetchAttendees();
  }, [id]);

  useEffect(() => {
    const fetchParticipants = async () => {
      const fetchedParticipants = await Api.fetchParticipants(id);
      setParticipants(fetchedParticipants);
    };
    fetchParticipants();
  }, [id]);

  const handleAttendance = (participant) => {
    const isAttending = attendees.some((att) => att.id === participant.id);
    if (isAttending) {
      // Remove the participant from attendees if they're currently marked as attending
      setAttendees(attendees.filter((att) => att.id !== participant.id));
    } else {
      // Add the participant to attendees if they're not currently marked as attending
      setAttendees([...attendees, participant]);
    }
  };

  const handleAttendanceClick = async () => {
    await Api.updateAttendees(id, attendees)
      .then(() => {
        handleOpenSnackbar("Successfully updated attendance", "success");
      })
      .catch((error) => {
        handleOpenSnackbar(error.message, "error");
      });
  };

  return (
    <>
      <h1>Attendance List</h1>
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
      {participants.length > 0 ? (
        <>
          <List>
            {participants.map((participant) => (
              <ListItem
                key={participant.id}
                secondaryAction={
                  <Checkbox
                    edge="start"
                    onChange={() => handleAttendance(participant)}
                    checked={attendees.some((att) => att.id === participant.id)}
                  />
                }
              >
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar src={participant.imageURL} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={participant.name}
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {participant.email}
                        </Typography>
                        <br />
                        {participant.contactDetails}
                      </>
                    }
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <ThemeProvider theme={theme}>
            <Button
              onClick={handleAttendanceClick}
              variant="contained"
              color="customColor"
              sx={{ mt: 2, borderRadius: 25, width: "25%" }}
              endIcon={<ChecklistIcon />}
            >
              Mark Attendance
            </Button>
          </ThemeProvider>
        </>
      ) : (
        <img
          src={NoParticipants}
          style={{ marginTop: "-10%", height: "30%", width: "30%" }}
        />
      )}
    </>
  );
}
