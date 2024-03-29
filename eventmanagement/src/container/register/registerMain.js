import * as React from "react";
import {
  Grid,
  Box,
  Paper,
  Typography,
  TextField,
  CssBaseline,
} from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import singapore from "../../assets/singapore.jpeg";
import { Link } from "react-router-dom";

export default function RegisterMain() {
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
          <TextField
            sx={{ my: 1, width: "100%" }}
            label="Name"
            variant="outlined"
          />
          <TextField
            sx={{ my: 1, width: "100%" }}
            label="Email"
            variant="outlined"
          />
          <TextField
            sx={{ my: 1, width: "100%" }}
            label="Phone Number"
            variant="outlined"
          />
          <TextField
            sx={{ my: 1, width: "100%" }}
            label="Password"
            variant="outlined"
          />
          <Link sx={{ width: "200%" }} to="/login">
            Already have an Account? Log in
          </Link>
        </Box>
      </Grid>
    </Grid>
  );
}
