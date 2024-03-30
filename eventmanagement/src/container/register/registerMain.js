import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Button,
  Typography,
  TextField,
  CssBaseline,
} from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import singapore from "../../assets/singapore.jpeg";
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Api from "../../helpers/Api";

export default function RegisterMain() {
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await Api.createAccount(formData);
      const account = await response.json();
    } catch (error) {
      console.log(error);
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
            width: "60%",
          }}
        >
          <Typography
            fontFamily={"open sans, sans-serif"}
            fontSize={24}
            fontWeight={"bold"}
            color={"#181B13"}
          >
            Register
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              sx={{ my: 1, width: "100%" }}
              label="Name"
              name="name"
              variant="outlined"
            />
            <TextField
              sx={{ my: 1, width: "100%" }}
              label="Email"
              name="email"
              variant="outlined"
            />
            <TextField
              sx={{ my: 1, width: "100%" }}
              label="Phone Number"
              name="contactDetails"
              variant="outlined"
            />
            <TextField
              sx={{ my: 1, width: "100%" }}
              label="Password"
              name="password"
              variant="outlined"
            />
            <Link sx={{ width: "200%" }} to="/login">
              Already have an Account? Log in
            </Link>
            <ThemeProvider theme={theme}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                href="/login"
                color="customColor"
                sx={{ mt: 2, borderRadius: 25 }}
              >
                Register Now!
              </Button>
            </ThemeProvider>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
}
