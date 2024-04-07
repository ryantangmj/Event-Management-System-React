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
import PostAddIcon from "@mui/icons-material/PostAdd";
import swal from "sweetalert";
import CloudinaryUploadWidget from "../../helpers/CloudinaryUploadWidget";

export default function AddEventDetails() {
  const navigate = useNavigate();
  const maxChars = 255;
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = React.useState();
  const [imageURL, setImageURL] = useState("empty");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  function handleOnUpload(error, result, widget) {
    if (error) {
      console.log(error);
      // widget.close({
      //   quiet: true,
      // });
      return;
    }
    swal("Success", "Media uploaded", "success");
    console.log(result.info.secure_url);
    const secureUrl = result?.info?.secure_url;

    if (secureUrl) {
      console.log("setURL");
      setImageURL(secureUrl);
      console.log(imageURL);
    }
  }

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
      !formData.title ||
      imageURL === "empty"
    ) {
      setErrorMessage("All fields are required");
      setOpen(true);
      return;
    }

    const preparedData = {
      ...formData,
      imageURL,
    };

    try {
      await Api.createEvent(preparedData);
      console.log(preparedData);
      navigate("/hostedEvents");
    } catch (error) {
      setErrorMessage(
        error.message || "An error occurred while creating the event."
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
            width: "60%",
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
            fontFamily={"open sans, sans-serif"}
            fontSize={24}
            fontWeight={"bold"}
            color={"#181B13"}
          >
            Add Event
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              sx={{ my: 1, width: "100%" }}
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
              sx={{ my: 1, width: "100%" }}
            />
            <TextField
              sx={{ my: 1, width: "100%" }}
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
                sx={{ my: 1, width: "100%" }}
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
                sx={{ my: 1, width: "100%" }}
              />
            </LocalizationProvider>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 16,
              }}
            >
              {imageURL === "empty" ? (
                <CloudinaryUploadWidget onUpload={handleOnUpload}>
                  {({ open }) => {
                    function handleOnClick(e) {
                      e.preventDefault();
                      open();
                    }
                    return (
                      <Button
                        variant="contained"
                        onClick={handleOnClick}
                        sx={{
                          height: "150px",
                          fontFamily: "nunito, sans-serif",
                          backgroundColor: "transparent",
                          color: "#181B13",
                          border: "1px dashed #181B13",
                          borderRadius: "10px",
                          "&:hover": { backgroundColor: "#DFDFDF" },
                          px: "16px",
                          py: "8px",
                          fontSize: "18px",
                          cursor: "pointer",
                          textTransform: "initial",
                          maxWidth: "400px",
                          width: "100%",
                        }}
                      >
                        Upload a photo of your event
                      </Button>
                    );
                  }}
                </CloudinaryUploadWidget>
              ) : (
                <Box
                  id="image"
                  component="img"
                  fullWidth
                  sx={{
                    height: "150px",
                    width: "100%",
                    border: "1px dashed #181B13",
                    borderRadius: "10px",
                    alignSelf: "flex-start",

                    "&:hover": { backgroundColor: "#FFFFFF" },
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    objectFit: "contain",
                  }}
                  src={imageURL}
                  alt="Uploaded Event Picture"
                />
              )}
            </div>
            <Box textAlign="center">
              <ThemeProvider theme={theme}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  color="customColor"
                  endIcon={<PostAddIcon />}
                  sx={{ mt: 2, borderRadius: 25, width: "100%"}}
                >
                  Add Event
                </Button>
              </ThemeProvider>
            </Box>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
}
