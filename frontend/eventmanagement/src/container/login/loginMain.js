import React, { useState } from "react";
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
  Link,
} from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import singapore from "../../assets/singapore.jpeg";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Api from "../../helpers/Api";
import LockOpenIcon from "@mui/icons-material/LockOpen";

export default function LoginMain() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = React.useState();

  const theme = createTheme({
    palette: {
      customColor: {
        main: "#EFBC9B",
        contrastText: "#fff",
      },
    },
  });

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });

    console.log(formData);
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const accountData = await Api.authenticateAccount(formData);
      if (accountData) {
        navigate("/home");
      } else {
        // It's likely this branch may not be needed if your API call throws an error on failure
        setErrorMessage(
          "Authentication failed. Please check your credentials."
        );
        setOpen(true);
      }
    } catch (error) {
      setErrorMessage(
        error.message || "An error occurred during authentication."
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
            src={singapore}
            alt="Eden Food Background Image."
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
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              sx={{ my: 1, width: "100%", mb: 1 }}
              label="Email"
              name="email"
              onChange={handleChange}
              variant="outlined"
            />
            <FormControl sx={{ width: "100%", mb: 1 }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="password"
                name="password"
                onChange={handleChange}
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
              <Box textAlign="center">
                <ThemeProvider theme={theme}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    color="customColor"
                    endIcon={<LockOpenIcon />}
                    sx={{ mt: 2, mb: 2, borderRadius: 25, width: "100%" }}
                  >
                    Login
                  </Button>
                </ThemeProvider>
              </Box>
            </FormControl>
            <Box textAlign="center">
              <Link
                sx={{
                  fontFamily: "nunito, sans-serif",
                  fontSize: "14px",
                  "&:hover": {
                    color: "#9CAFAA",
                    textDecorationColor: "#9CAFAA",
                  },
                }}
                href="/register"
              >
                New to Event Genesis? Register here
              </Link>
            </Box>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
}
