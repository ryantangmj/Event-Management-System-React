import * as React from "react";
import { Box, Button, CssBaseline, Grid, Typography } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import image from "../../assets/landing.avif";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function Landing() {
  const theme = createTheme({
    palette: {
      customColor: {
        main: "#EFBC9B",
        contrastText: "#fff",
      },
    },
  });

  return (
    <>
      <CssBaseline />
      <Grid container sx={{ height: "100vh" }}>
        <Grid
          item
          xs={false}
          sm={false}
          md={8}
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
            pl: 4,
            pr: 4,
            textAlign: "left",
          }}
        >
          <Typography
            fontFamily={"open sans, sans-serif"}
            fontSize={40}
            fontWeight={"bold"}
            gutterBottom
          >
            Welcome to Event Genesis
          </Typography>
          <Typography
            fontFamily={"open sans, sans-serif"}
            fontSize={24}
            gutterBottom
          >
            Where Every Event Finds its Beginning
          </Typography>
          <ThemeProvider theme={theme}>
            <Button
              variant="contained"
              size="large"
              href="/login"
              color="customColor" // Use the custom color from the theme
            >
              Join Us Today!
            </Button>
          </ThemeProvider>
        </Grid>
      </Grid>
    </>
  );
}
