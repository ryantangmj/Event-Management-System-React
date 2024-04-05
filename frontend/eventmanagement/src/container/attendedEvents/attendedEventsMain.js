import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  Container,
  CssBaseline,
} from "@mui/material";
import ItemCard from "./itemCard.js";
import Footer from "../../components/Footer/foooter.jsx";
import Navbar from "../../components/Navbar/navbar.jsx";
import Api from "../../helpers/Api";
import AspectRatio from "@mui/joy/AspectRatio";
import image from "../../assets/eventsCollage.jpeg";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";

export default function AttendedEvents() {
  const [events, setEvents] = useState([]);

  const theme = createTheme({
    palette: {
      customColor: {
        main: "#9CAFAA",
        contrastText: "#FBF3D5",
      },
    },
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const fetchedEvents = await Api.getRegEvents();
        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Failed to fetch registered events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <Box>
      <CssBaseline />
      <Navbar />
      <Box
        id="hero"
        sx={() => ({
          width: "100%",
          bgcolor: "#FBF3D5",
          minHeight: "70vh",
          pb: "2rem",
        })}
      >
        {events.length === 0 ? (
          <Grid container spacing={1} sx={{ height: "100vh", pt: 12 }}>
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
                textAlign: "left",
              }}
            >
              <Typography
                fontFamily={"open sans, sans-serif"}
                fontSize={40}
                fontWeight={"bold"}
                sx={{ color: "#9CAFAA", ml: 18 }}
                gutterBottom
              >
                You have not registered for any events!
              </Typography>
              <ThemeProvider theme={theme}>
                <Button
                  variant="contained"
                  size="large"
                  href="/home"
                  color="customColor"
                  sx={{ borderRadius: 2, ml: 18 }}
                >
                  Register now
                  <ArrowForwardIcon sx={{ ml: 0.5, mt: -0.3 }} />
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
                  alt="Past event images"
                />
              </AspectRatio>
            </Grid>
          </Grid>
        ) : (
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              pt: "7rem",
            }}
          >
            <h1>Registered Events</h1>
            <Grid
              container
              spacing={4}
              sx={{ justifyContent: "center", alignItems: "center" }}
            >
              {events.map((event) => (
                <Grid item key={event.id}>
                  <Link
                    to={`/event/${event.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <ItemCard event={event} />
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Container>
        )}
      </Box>
      <Footer />
    </Box>
  );
}
