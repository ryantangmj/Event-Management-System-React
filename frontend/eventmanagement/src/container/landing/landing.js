import * as React from "react";
import { Box, Button, CssBaseline, Grid, Typography } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import image from "../../assets/landing.avif";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Footer from "../../components/Footer/foooter.jsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function Landing() {
  const theme = createTheme({
    palette: {
      customColor: {
        main: "#9CAFAA",
        contrastText: "#FBF3D5",
      },
    },
  });

  return (
    <>
      <CssBaseline />
      <Grid container sx={{ height: "100vh" }}>
        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          backgroundColor="#FBF3D5"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            pl: 8,
            textAlign: "left",
          }}
        >
          <Typography
            fontFamily={"open sans, sans-serif"}
            fontSize={40}
            fontWeight={"bold"}
            sx={{ color: "#9CAFAA" }}
            gutterBottom
          >
            Welcome to Event Genesis
          </Typography>
          <Typography
            fontFamily={"open sans, sans-serif"}
            fontSize={24}
            gutterBottom
            sx={{ color: "#9CAFAA" }}
          >
            Where Every Event Finds its Beginning
          </Typography>
          <ThemeProvider theme={theme}>
            <Button
              variant="contained"
              size="large"
              href="/login"
              color="customColor"
              endIcon={<ArrowForwardIcon />}
              sx={{ borderRadius: 2 }}
            >
              Join Us Today!
            </Button>
          </ThemeProvider>
        </Grid>
        <Grid
          item
          xs={false}
          sm={false}
          md={8}
          sx={{
            position: "relative",
            backgroundColor: "#FBF3D5",
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
              width: 750,
              display: { xs: "none", sm: "none", md: "flex" },
            }}
            ratio="7/5"
          >
            <Box
              id="image"
              component="img"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "80%",
                width: "80%",
              }}
              src={image}
              alt="Eden Food Background Image."
            />
          </AspectRatio>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}
