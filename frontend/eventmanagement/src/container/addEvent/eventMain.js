import React, { useState } from "react";
import {
  Grid,
  Box,
  Button,
  Typography,
  TextField,
  CssBaseline,
  Snackbar,
  Alert,
} from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import events from "../../assets/events.jpeg";
import dayjs from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useNavigate } from "react-router-dom";
import Api from "../../helpers/Api";

export default function AddEventDetails() {
  const navigate = useNavigate();
  const maxChars = 255;
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = React.useState();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
  };

  const [formData, setFormData] = useState({
    date: "",
    deadline: "",
    description: "",
    location: "",
    title: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !formData.date ||
      !formData.deadline ||
      !formData.description ||
      !formData.location ||
      !formData.title
    ) {
      setErrorMessage("All fields are required");
      setOpen(true);
      return;
    }

    const preparedData = {
      ...formData,
      date: formData.date.format("YYYY-MM-DDTHH:mm:ss"),
      deadline: formData.deadline.format("YYYY-MM-DDTHH:mm:ss"),
    };

    try {
      await Api.createEvent(preparedData);
      navigate("/hostedEvents");
    } catch (error) {
      setErrorMessage(
        error.message || "An error occurred while creating the account."
      );
      setOpen(true);
    }
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
            src={events}
            alt="Events"
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
            alignItems: "center",
            justifyContent: { xs: "flex-start", sm: "center" },
            height: "100vh",
            width: { xs: "100%", md: "30%" },
          }}
        >
          <form onSubmit={handleSubmit}>
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
              fontFamily={"open sans, sans-serif"}
              fontSize={24}
              fontWeight={"bold"}
              color={"#181B13"}
            >
              Add Event
            </Typography>
            <TextField
              sx={{ my: 1, width: "140%" }}
              label="Title"
              name="title"
              onChange={handleChange}
              variant="outlined"
            />
            <TextField
              label="Description"
              multiline
              rows={4}
              name="description"
              onChange={handleChange}
              inputProps={{
                maxLength: maxChars,
              }}
              helperText={`${
                maxChars - formData.description.length
              } characters remaining`}
              variant="outlined"
              sx={{ my: 1, width: "140%" }}
            />
            <TextField
              sx={{ my: 1, width: "140%" }}
              label="Location"
              name="location"
              onChange={handleChange}
              variant="outlined"
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Deadline"
                name="deadline"
                onChange={(newValue) => {
                  handleChange({
                    target: { name: "deadline", value: newValue },
                  });
                }}
                minDate={dayjs()}
                sx={{ my: 1, width: "140%" }}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                name="date"
                onChange={(newValue) => {
                  handleChange({ target: { name: "date", value: newValue } });
                }}
                minDate={formData.deadline !== "" ? formData.deadline : dayjs()}
                label="Date"
                sx={{ my: 1, width: "140%" }}
              />
            </LocalizationProvider>
            <ThemeProvider theme={theme}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                color="customColor"
                sx={{ mt: 2, borderRadius: 25 }}
              >
                Add Event
              </Button>
            </ThemeProvider>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
}
