import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Button,
  Typography,
  TextField,
  CssBaseline,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Api from "../../helpers/Api";
import cleanup from "../../assets/cleanup.jpeg";
import swal from "sweetalert";
import EditIcon from "@mui/icons-material/Edit";
import CloudinaryUploadWidget from "../../helpers/CloudinaryUploadWidget";
import { set } from "date-fns";

export default function EditProfile() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [showPassword2, setShowPassword2] = React.useState(false);
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = React.useState();
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [imageURL, setImageURL] = React.useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseDownPassword2 = (event) => {
    event.preventDefault();
  };

  const theme = createTheme({
    palette: {
      customColor: {
        main: "#EFBC9B",
        contrastText: "#fff",
      },
    },
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactDetails: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
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
    }
  }

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await Api.getAccount();
        setFormData({
          name: fetchedUser.name || "",
          contactDetails: fetchedUser.contactDetails || "",
          email: fetchedUser.email || "",
          password: fetchedUser.password || "",
        });
        setImageURL(fetchedUser.imageURL || "empty");
        setConfirmPassword(fetchedUser.password || "");
        console.log(formData);
      } catch (error) {
        console.log("Failed to fetch registered events:", error);
      }
    };

    fetchUser();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { name, email, contactDetails, password } = formData;

    if (!name || !email || !contactDetails || !password || !confirmPassword) {
      setErrorMessage("All fields are required");
      setOpen(true);
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMessage("Please enter a valid email address");
      setOpen(true);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      setOpen(true);
      return;
    }

    const extendedFormData = {
      ...formData,
      imageURL,
    };

    try {
      await Api.updateAccount(extendedFormData);
      navigate("/home");
    } catch (error) {
      setErrorMessage(
        error.message || "An error occurred while creating the account."
      );
      setOpen(true);
    }
  };

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
            src={cleanup}
            alt="Image of past event"
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
          component="form"
          onSubmit={handleSubmit}
          sx={{
            mx: 4,
            mt: { xs: 15, md: 0 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
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
            fontFamily={"open sans, sans-serif"}
            fontSize={24}
            fontWeight={"bold"}
            color={"#181B13"}
          >
            Edit Profile
          </Typography>
          <TextField
            sx={{ my: 1, width: "100%" }}
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            sx={{ my: 1, width: "100%" }}
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            sx={{ my: 1, width: "100%" }}
            label="Phone Number"
            name="contactDetails"
            value={formData.contactDetails}
            onChange={handleChange}
            variant="outlined"
          />
          <FormControl sx={{ my: 1, width: "100%" }} variant="outlined">
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              onChange={handleChange}
              name="password"
              value={formData.password}
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <FormControl sx={{ my: 1, width: "100%" }} variant="outlined">
            <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
            <OutlinedInput
              id="confirm-password"
              type={showPassword2 ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword2}
                    onMouseDown={handleMouseDownPassword2}
                    edge="end"
                  >
                    {showPassword2 ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
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
                      fullWidth
                      onClick={handleOnClick}
                      sx={{
                        height: "150px",
                        fontFamily: "nunito, sans-serif",
                        backgroundColor: "#DFDFDF",
                        color: "#181B13",
                        border: "1px dashed #181B13",
                        borderRadius: "10px",
                        "&:hover": { backgroundColor: "#FFFFFF" },
                        px: "16px",
                        py: "8px",
                        fontSize: "18px",
                        cursor: "pointer",
                        textTransform: "initial",
                      }}
                    >
                      Upload Your Profile Photo
                    </Button>
                  );
                }}
              </CloudinaryUploadWidget>
            ) : (
              <Box
                sx={{
                  position: "relative",
                  "&:hover #editIcon": {
                    display: "flex",
                  },
                }}
              >
                <img
                  src={imageURL}
                  alt="Uploaded Profile Picture"
                  style={{
                    height: "200px",
                    width: "200px",
                    borderRadius: "10px",
                    objectFit: "cover",
                  }}
                />
                <CloudinaryUploadWidget onUpload={handleOnUpload}>
                  {({ open }) => {
                    return (
                      <IconButton
                        id="editIcon"
                        onClick={(e) => {
                          e.preventDefault();
                          open();
                        }}
                        sx={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          display: "none",
                          backgroundColor: "rgba(0, 0, 0, 0.5)",
                          color: "white",
                          "&:hover": {
                            backgroundColor: "rgba(0, 0, 0, 0.7)",
                          },
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    );
                  }}
                </CloudinaryUploadWidget>
              </Box>
            )}
          </div>
          <ThemeProvider theme={theme}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              color="customColor"
              sx={{ mt: 2, borderRadius: 25 }}
            >
              Edit Profile
            </Button>
          </ThemeProvider>
        </Box>
      </Grid>
    </Grid>
  );
}
